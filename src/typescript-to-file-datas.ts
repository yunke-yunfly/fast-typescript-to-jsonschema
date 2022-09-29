/** 2021-07-12 wangw19@mingyuanyun.com ts类型转换为jsonschema 解析ts类型文件，与ts文件中的类型定义 */
import * as path from 'path';
import traverse from '@babel/traverse';
import * as _ from 'lodash';
import * as fs from 'fs';

// types
import type { AnyOption, TSTypeAnnotationConfig, TypeAnnotationConfig } from './types';
// utils
import { genAst } from './utils';
// require
const chalk = require('chalk');
const doctrine = require('doctrine');

export enum ImportType {
  ImportSpecifier = 'ImportSpecifier',
  ImportDefaultSpecifier = 'ImportDefaultSpecifier',
  ImportNamespaceSpecifier = 'ImportNamespaceSpecifier',
}

/**
 * 处理ts type 类型，生成 jsonschema
 *
 * @class genTypeSchema
 * @export
 */
export default class typescriptToFileDatas {
  jsonData: AnyOption;
  cacheFiles: string[];
  filterFiles: string[];
  filterRefKeywords: string[];

  constructor() {
    this.jsonData = {};
    this.cacheFiles = [];
    this.filterFiles = [];
    this.filterRefKeywords = ['Omit', 'Pick', 'Record', 'Partial', 'Required', 'Array', 'Promise'];
  }

  /**
   * 获取JSON Data数据
   *
   * @param {string} file
   * @returns {any} {AnyOption}
   * @export
   */
  genJsonData(): AnyOption {
    return this.jsonData;
  }

  setJsonData(fileName: string, data: AnyOption) {
    this.jsonData[fileName] = data;
  }

  extendJsonData(fileName: string, key: string, data: AnyOption) {
    this.jsonData[fileName] = this.jsonData[fileName] || {};
    this.jsonData[fileName][key] = this.jsonData[fileName][key] || data;
  }

  /**
   * 获取已缓存过的文件
   *
   * @memberof genTypeSchema
   * @returns {any} {string[]}
   */
  getCacheFiles(): string[] {
    return this.cacheFiles;
  }

  /**
   * 处理ts类型
   *
   * @memberof genTypeSchema
   * @param {AnyOption} path
   * @param {AnyOption} json
   * @param {string} [parentKey]
   * @param {AnyOption} [parentJson]
   */
  handleTSTypeAnnotation(
    json: AnyOption,
    parentJson: null | AnyOption,
    option: TSTypeAnnotationConfig,
  ): void {
    const { node, parentKey, file, namespaces } = option || {};

    const key = _.get(node, 'key.name') || _.get(node, 'key.value') || '';
    const required = !node.optional;

    if (!key) return;

    const typeAnnotation = this.transformTypeAnnotation({
      typeAnnotation: node.typeAnnotation,
      file,
      attrKey: key,
      namespaces,
    });

    if (typeAnnotation && typeof typeAnnotation === 'object') {
      json.properties[key] = {
        ...typeAnnotation,
      };
      // description | example
      const res = this.getDescAndExampleFromJsDoc(node) || {};
      if (res.description) json.properties[key].description = res.description;
      if (_.get(res, [key, 'example'])) {
        json.properties[key].default = _.get(res, [key, 'example']);
      }

      if (required) {
        json.required.push(key);
      }
    }
    if (parentKey && parentJson) {
      parentJson.properties[parentKey] = json;
    }
  }

  /**
   * 文件过滤
   *
   * @memberof genTypeSchema
   * @param {string} file
   * @returns {any} {string}
   */
  handleFilterFiles(file: string): string {
    const res = this.filterFiles.filter((item: string) => file.indexOf(item) > -1);
    // 过滤不需要匹配的文件
    if (res.length) {
      return '';
    }

    if (file.indexOf('./') > -1 || file.indexOf('../') > -1) {
      return file;
    }

    // 不解析npm包
    return '';
  }

  /**
   * 通过文件获得解析数据
   *
   * @param {any} file
   * @returns
   */
  genJsonDataFormFile(file: string, ast?: AnyOption | null, filterFiles?: string[]): AnyOption {
    if (filterFiles) {
      this.filterFiles = [...this.filterFiles, ...filterFiles];
    }

    const { dir, ext } = path.parse(file);

    const _this = this;
    let result: AnyOption = {};
    const dependTypeFiles: any = new Set();

    // ast
    const ast_ = ast || genAst(file);

    const visitor = {
      // 处理外部import类型
      // eslint-disable-next-line func-names
      'ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration': function (path_: AnyOption) {
        // 导入文件处理
        const sourceValue = _.get(path_, 'node.source.value');
        if (!sourceValue) return;

        const filePath = _this.handleFilterFiles(sourceValue);
        if (!filePath) {
          path_.skip();
          return;
        }

        let source = '';
        // 找依赖的文件,优先级 .ts >> .d.ts >> /index.ts >> /index.d.ts
        for (const possibleExt of ['', '.d', '/index', '/index.d']) {
          const possibleFile = path.resolve(dir, sourceValue + possibleExt + ext);
          if (fs.existsSync(possibleFile)) {
            source = possibleFile;
            break;
          }
        }

        if (!source) return;

        // 文件缓存处理
        if (!_this.cacheFiles.includes(source)) {
          _this.cacheFiles.push(source);
          dependTypeFiles.add(source);
        }

        const type = _.get(path_, 'node.type');

        // 处理从另一个文件导出模块的类型
        if (type === 'ExportAllDeclaration') {
          const exported = _.get(path_, 'node.exported.name');
          // 存在 exported 则是命名空间导入，否则是export * 导出全部模块
          if (exported) {
            result[exported] = {
              $ref: `#${source}`,
              type: ImportType.ImportNamespaceSpecifier,
              from: exported,
            };
          } else {
            // 解析导入文件中的类型并合并
            const { data: importJsonData = {} } =
              _this.genJsonDataFormFile(source, null, filterFiles) || {};
            result = { ...result, ...importJsonData };
          }
          return;
        }

        path_.traverse({
          ImportSpecifier: (importSpecifierPath: AnyOption) => {
            const typeName = _.get(importSpecifierPath, 'node.local.name');
            const fromTypeName = _.get(importSpecifierPath, 'node.imported.name');
            result[typeName] = {
              $ref: `#${source}`,
              from: fromTypeName,
              type: ImportType.ImportSpecifier,
            };
          },
          ImportNamespaceSpecifier: (importNamespaceSpecifierPath: AnyOption) => {
            const typeName = _.get(importNamespaceSpecifierPath, 'node.local.name');
            result[typeName] = { $ref: `#${source}`, type: ImportType.ImportNamespaceSpecifier };
          },
          ExportSpecifier: (exportSpecifierPath: AnyOption) => {
            const localTypeName = _.get(exportSpecifierPath, 'node.local.name');
            const exportedTypeName = _.get(exportSpecifierPath, 'node.exported.name');
            result[exportedTypeName] = {
              $ref: `#${source}`,
              from: localTypeName,
              type: ImportType.ImportSpecifier,
            };
          },
          ExportNamespaceSpecifier: (exportNamespaceSpecifierPath: AnyOption) => {
            const exportedTypeName = _.get(exportNamespaceSpecifierPath, 'node.exported.name');
            result[exportedTypeName] = {
              $ref: `#${source}`,
              type: ImportType.ImportNamespaceSpecifier,
            };
          },
          ImportDefaultSpecifier: (importDefaultSpecifierPath: AnyOption) => {
            const localTypeName = _.get(importDefaultSpecifierPath, 'node.local.name');
            result[localTypeName] = {
              $ref: `#${source}`,
              type: ImportType.ImportDefaultSpecifier,
              from: 'default',
            };
          },
        });
      },
      ExportDefaultDeclaration: (exportDefaultDeclarationPath: AnyOption) => {
        const name = _.get(exportDefaultDeclarationPath, 'node.declaration.name');
        result.default = result[name];
      },
      // 处理type类型
      TSTypeAliasDeclaration(path: AnyOption) {
        const { node = {} } = path || {};
        const tsTypeName = _.get(node, 'id.name');

        const json: AnyOption = {
          ..._this.transformTypeAnnotation({
            typeAnnotation: node.typeAnnotation || {},
            file,
            attrKey: tsTypeName,
          }),
        };
        // description | example
        const res = _this.getDescAndExampleFromJsDoc(node) || {};
        if (res.description) json.description = res.description;
        if (_.get(res, [tsTypeName, 'example'])) json.example = _.get(res, [tsTypeName, 'example']);

        result[tsTypeName] = json;
      },
      // 处理interface类型
      TSInterfaceDeclaration(path: AnyOption) {
        const namespaces: string[] = [];
        path.findParent((path: AnyOption) => {
          const id = path.get('id').toString();
          if (id) namespaces.unshift(id);
        });
        const tsTypeName = _.get(path.node, 'id.name');
        const key = namespaces.length ? `${namespaces.join('.')}.${tsTypeName}` : tsTypeName;
        const json: AnyOption = {
          type: 'object',
          properties: {},
          required: [],
          additionalProperties: false,
        };

        path.traverse({
          // 记录参数
          TSTypeParameterDeclaration(path: AnyOption) {
            const typeParams = _.get(path, 'node.params');
            if (typeParams) {
              json.typeParams = {};
              typeParams.forEach((node: AnyOption, i: number) => {
                if (node.default) {
                  const defaultTypeName = _.get(node.default, 'id.name');
                  const defaultType = _this.transformTypeAnnotation({
                    typeAnnotation: node.default, file,
                    attrKey: defaultTypeName,
                  });
                  json.typeParams[i] = {
                    name: node.name,
                    default: defaultType,
                  }
                  return;
                }
                json.typeParams[i] = node.name;
              });
            }
          },
          TSExpressionWithTypeArguments(path: AnyOption) {
            const extendsInterface = _this.getTypeName(_.get(path, 'node.expression'));
            if (extendsInterface) {
              json.extends = extendsInterface;
            }
          },
          TSIndexSignature(path: AnyOption) {
            if (path.parent.type === 'TSTypeLiteral') {
              return;
            }
            let res = _this.transformTypeAnnotation({
              typeAnnotation: _.get(path, 'node.typeAnnotation'),
              file,
            });
            if (res) {
              if (_.get(res, 'type') === 'object' && !_.get(res, 'properties')) {
                res = {};
              }
              json.additionalProperties = res;
            }
          },
          TSPropertySignature(path: AnyOption) {
            if (path.parent.type === 'TSTypeLiteral') {
              return;
            }
            const key = _.get(path, 'node.key.name') || _.get(path, 'node.key.value');

            _this.handleTSTypeAnnotation(json, null, { node: path.node, file, namespaces, });

            path.traverse({
              TSTypeLiteral(path: AnyOption) {
                if (path.parent.type === 'TSTypeParameterInstantiation' || path.parent.type === 'TSTypeAnnotation') {
                  return;
                }
                const childJson = { type: 'object', properties: {}, required: [] };
                path.traverse({
                  TSPropertySignature(path: AnyOption) {
                    _this.handleTSTypeAnnotation(childJson, json, {
                      node: path.node,
                      parentKey: key,
                      file,
                      namespaces,
                    });
                  },
                });
                _this.formatJsonSchema(childJson);
              },
            });
          },
        });

        _this.formatJsonSchema(json);

        result[key] = json;
      },
      // 处理枚举类型
      TSEnumDeclaration(path: AnyOption) {
        const namespaces: string[] = [];
        path.findParent((path: AnyOption) => {
          const id = path.get('id').toString();
          if (id) namespaces.unshift(id);
        });
        const json: AnyOption = {};
        const tsTypeName = path.get('id').toString();
        const key = namespaces.length ? `${namespaces.join('.')}.${tsTypeName}` : tsTypeName;
        const members = path.get('members');

        const memberMap = new Map();
        const enumKeys = members.reduce((accEnumKeys: (number | string)[], member: any) => {
          const type = _this.simpleTsTypeTransform(member.get('initializer').type);
          let value = member.get('initializer').toString().replace(/'/g, '');
          const prevEnumKey = accEnumKeys.length ? accEnumKeys[accEnumKeys.length - 1] : -1;

          const name = _.get(member.get('name'), 'container.id.name');

          if (value === '') {
            value = (prevEnumKey as number) + 1;
          } else {
            try {
              [...memberMap.keys()].forEach((memberName) => {
                value = value.replace(new RegExp(memberName, 'g'), memberMap.get(memberName));
              });
              // eslint-disable-next-line no-eval
              value = eval(value);
            } catch (error) {
              if (json.type && json.type !== 'string') {
                value = NaN;
              }
            }
          }
          memberMap.set(name, value);

          if (!json.type) json.type = type || 'number';

          return [...accEnumKeys, value];
        }, []);

        json.enum = enumKeys;
        if (!json.enum.length) {
          (console as Console).warn(
            chalk.red(
              `错误：%s 文件下的【%s】属性，请不要定义为【空枚举类型】，它将会被解析为空Array类型。`,
            ),
            file,
            tsTypeName,
          );
        }
        result[key] = json;
      },
    };

    traverse(ast_ as any, visitor);

    if (dependTypeFiles.size) {
      for (const item of dependTypeFiles) {
        const { data, file } = this.genJsonDataFormFile(item as string);
        this.setJsonData(file, data);
      }
    }

    this.setJsonData(file, result);

    return { data: result, file };
  }

  /**
   * 只获取代码前注释 支持行内注释与块注释
   *
   * @param {any} node
   * @returns {any}
   */
  getDescription(node: AnyOption): AnyOption[] {
    const { leadingComments = [] } = node || {};
    return leadingComments.reduce((prev: (AnyOption | string)[], next: AnyOption) => {
      if (next.type === 'CommentLine') {
        // 行内注释
        let { description, tags } = doctrine.parse(next.value, {
          unwrap: true,
          tags: ['param', 'description'],
          sloppy: true,
        });
        let tags_: AnyOption[] = [];
        if (tags && tags.length) {
          const next: AnyOption = tags[0] || {};
          description = next.description || '';
          tags_ = [
            {
              tag: next.title || '',
              name: next.name || '',
              type: _.get(next, 'type.name') || _.get(next, 'type.expression.name') || '',
              required: _.get(next, 'type') !== 'OptionalType',
              description,
              example: next.default || '',
            },
          ];
        }

        const result: AnyOption = { description };
        if (tags_.length) result.tags = tags_;

        return [...prev, result];
      }
      if (next.type === 'CommentBlock') {
        // 块注释
        const result = doctrine.parse(next.value, {
          unwrap: true,
          tags: ['param', 'description'],
          sloppy: true
        });

        const description = _.get(result, 'description') || '';
        const tags = _.get(result, 'tags') || [];

        const handleTags = tags.reduce((perv: AnyOption[], next: AnyOption) => {
          return [
            ...perv,
            {
              tag: next.title,
              name: next.name,
              type: _.get(next, 'type.name') || _.get(next, 'type.expression.name') || '',
              required: _.get(next, 'type') !== 'OptionalType',
              description: next.description || '',
              example: next.default || '',
            },
          ];
        }, []);

        return [...prev, { description, tags: handleTags }];
      }
      return prev;
    }, []);
  }

  /**
 * 单行注释，多行注释 最终解析为一行字符串
 *
 * @memberof genTypeSchema
 * @param {AnyOption} node
 * @returns {any} {string}
 */
  getSimpleDescription(node: AnyOption): string {
    const description = this.getDescription(node) || [];

    if (!description.length) {
      return '';
    }
    const result = description.reduce((prev, next) => {
      if (typeof next === 'object') {
        return prev ? `${prev}, ${next.description}` : next.description;
      }
      return prev ? `${prev}, ${next}` : next;
    }, '');
    return (result as string).trim();
  }

  /**
   * 获得单|多行注释 和默认值
   *
   * @memberof genTypeSchema
   * @param {AnyOption} node
   * @returns {any} {{ description: string, [props: string]: any }}
   */
  getDescAndExampleFromJsDoc(node: AnyOption): { description: string;[props: string]: any } {
    const description = this.getDescription(node) || [];
    const json: AnyOption = {};

    const result = description.reduce((prev, next: AnyOption) => {
      const tags = _.get(next, 'tags') || [];
      tags.forEach((item: AnyOption) => {
        if (item.tag === 'description') {
          json.description_ = item.description
        } else {
          json[item.name] = item;
        }
      });

      if (!next.description) {
        return prev;
      }

      if (prev) {
        return `${prev}, ${next.description}`;
      }

      return next.description;
    }, '');

    return {
      description: result as string,
      ...json,
    };
  }

  /**
   * 处理关联的Type类型
   *
   * @param {any} typeName
   * @returns
   */
  handleRelationTypes(typeName: string) {
    const defaultTypes = ['array', 'number', 'string', 'boolean', 'object'];
    if (defaultTypes.includes(typeName.toLowerCase())) {
      return typeName.toLowerCase();
    }

    return { $ref: `#${typeName}` };
  }

  /**
   * 获得type类型名称
   *
   * @memberof genTypeSchema
   * @param {AnyOption} typeAnnotation
   * @returns {any} {string}
   */
  getTypeName(typeName: AnyOption, namespaces?: string[]): string {
    const name = _.get(typeName, 'name');
    if (name) {
      if (typeName.type === 'Identifier' && Array.isArray(namespaces) && namespaces.length) {
        return `${namespaces.join('.')}.${name}`
      }
      return name;
    }
    const { left, right } = typeName || {};

    const leftName = this.getTypeName(left);
    const rightName = this.getTypeName(right);

    if (leftName && rightName) {
      return `${leftName}.${rightName}`;
    }
    return 'object';
  }

  /**
   * 简单类型数据类型转换
   *
   * @memberof genTypeSchema
   * @param {string} tsType
   * @returns {any}
   */
  simpleTsTypeTransform(tsType: string): string | null {
    const BaseTypesMap: AnyOption = {
      TSNeverKeyword: 'never',
      TSAnyKeyword: 'any',
      TSStringKeyword: 'string',
      TSNumberKeyword: 'number',
      TSBooleanKeyword: 'boolean',
      TSTupleType: 'array',
      tsBigIntKeyword: 'number',
      StringLiteral: 'string',
      NumericLiteral: 'number',
      BooleanLiteral: 'boolean',
      TSNullKeyword: 'null',
    };
    return BaseTypesMap[tsType] || null;
  }

  /**
   * 递归处理ts类型解析
   *
   * @param {any} typeAnnotation
   * @returns {any}
   */
  transformTypeAnnotation(option: TypeAnnotationConfig): AnyOption | null {
    const { typeAnnotation, file, attrKey, refKey, namespaces } = option || {};
    if (!typeAnnotation) return null;
    const cType = _.get(typeAnnotation, 'type');
    if (!cType) return null;
    const type = this.simpleTsTypeTransform(cType);

    // 处理any|never|null类型 转换为object类型
    if (type === 'any' || type === 'never' || type === 'null') {
      if (file && attrKey) {
        (console as Console).warn(
          chalk.yellow(`警告：%s 文件下的【%s】属性，不推荐定义为【%s】它将会被解析为object类型。`),
          file,
          attrKey,
          type,
        );
      }
      return { type: 'object' };
    }
    if (type) {
      return { type };
    }

    // 处理 Number/自定义 等类型
    if (cType === 'TSTypeReference') {
      const name = this.getTypeName(typeAnnotation.typeName, namespaces);
      const type = this.handleRelationTypes(name);
      let items = null;
      if (typeAnnotation.typeParameters) {
        items = this.transformTypeAnnotation({
          typeAnnotation: typeAnnotation.typeParameters,
          file,
          attrKey,
          refKey: name,
          namespaces,
        });
      }
      // promise 特殊处理
      if (name === 'Promise') {
        return items;
      }

      const result: AnyOption = typeof type === 'object' && type.$ref ? type : { type };
      if (items) {
        if (items.extraParams) {
          const paramsNames = items.extraParams.map(
            (param: AnyOption) =>
              param.type || (param.$ref && param.$ref.replace(/#\/definitions|#/, '')) || '',
          );
          const newType = this.handleRelationTypes(`${name}<${paramsNames.join(',')}>`);
          result.$ref = typeof newType === 'object' ? newType.$ref : newType;
          result.$realRef = name;
        }
        result.items = items;
      }
      return result;
    }

    // 联合类型 或 例如：number|string
    if (cType === 'TSUnionType') {
      const result = this.handleAnyOfRelationDatas(typeAnnotation, file, attrKey);
      return this.handleAnyOf(result, file, attrKey) as any;
    }

    // 交叉类型 且 例如：number&string
    if (cType === 'TSIntersectionType') {
      return this.handleAllOfRelationDatas(typeAnnotation, file, attrKey);
    }

    // 处理 Array<string|number>
    // 处理Omit/Pick/Record/Array和泛型
    if (cType === 'TSTypeParameterInstantiation') {
      const params: (AnyOption | null)[] = [];
      typeAnnotation.params.forEach((item: AnyOption) => {
        const res = this.transformTypeAnnotation({
          typeAnnotation: item,
          file,
          attrKey,
          namespaces,
        });
        if (res) {
          params.push(res);
        }
      });
      // 泛型
      if (typeof 'refKey' !== 'undefined' && !this.filterRefKeywords.includes(refKey as string)) {
        return { extraParams: params };
      }
      if (params.length < 2) {
        return params[0];
      }
      return { type: params[0], extra: params[1] };
    }

    if (cType === 'TSParenthesizedType') {
      return this.transformTypeAnnotation({
        typeAnnotation: typeAnnotation.typeAnnotation,
        file,
        attrKey,
        namespaces,
      });
    }

    // 处理 string[] 等类型
    if (cType === 'TSArrayType') {
      const type = this.transformTypeAnnotation({
        typeAnnotation: typeAnnotation.elementType,
        file,
        attrKey,
        namespaces,
      });
      return type ? { type: 'array', items: type } : null;
    }

    // interface
    if (cType === 'TSTypeAnnotation') {
      const type = this.transformTypeAnnotation({
        typeAnnotation: typeAnnotation.typeAnnotation,
        file,
        attrKey,
        namespaces,
      });
      return type;
    }

    if (cType === 'TSTypeLiteral') {
      const members = typeAnnotation.members || [];
      const json = { type: 'object', properties: {}, required: [] };
      members.forEach((item: AnyOption) => {
        this.handleTSTypeAnnotation(json, null, { node: item, file, namespaces, });
      });

      this.formatJsonSchema(json);

      return json;
    }

    // name: '1' | '2' | '3' 处理为枚举类型
    if (cType === 'TSLiteralType') {
      const type = this.simpleTsTypeTransform(_.get(typeAnnotation, 'literal.type')) || 'string';
      const value = _.get(typeAnnotation, 'literal.value') || '';
      return {
        type,
        enum: [value],
      };
    }

    return null;
  }

  /**
   * 处理 anyOf 此处逻辑较复杂请慎重更改
   *
   * @param {any} typeAnnotation
   * @param {any} key
   * @returns
   */
  handleAnyOfRelationDatas(typeAnnotation: AnyOption, file?: string, attrKey?: string): AnyOption {
    const enumTypes = new Set();
    const enum_: AnyOption = { enum: [] };
    const result: AnyOption[] = [];

    typeAnnotation.types.forEach((item: AnyOption) => {
      const type: AnyOption =
        this.transformTypeAnnotation({ typeAnnotation: item, file, attrKey }) || {};
      if (!type) return;
      /**
       * 特殊处理 可变类型处理 例如： name: '1' | 2 | '3'| true| null|undefined | string[] | A
       * 处理为：{"name":{"anyOf":[{"type":"array","items":{"type":"string"}},{"$ref":"#/definitions/A"},{"enum":["1",2,"3",true]},{"type":"null"}]}
       */
      // 基础类型处理为枚举
      if (_.get(type, 'enum')) {
        enum_.enum.push(_.get(type, ['enum', 0]));
        enumTypes.add(_.get(type, 'type'));
      }
      // 处理其他类型
      else {
        result.push(type);
      }
    });

    if (!result.length) {
      if (!enum_.enum.length) {
        return { type: 'object' };
      }

      if (enumTypes.size === 1) {
        return {
          type: [...enumTypes][0],
          enum: enum_.enum,
        };
      }
      return enum_;
    }

    if (!enum_.enum.length) {
      return {
        anyOf: result,
      };
    }
    let item: AnyOption;
    if (enumTypes.size === 1) {
      item = {
        type: [...enumTypes][0],
        enum: enum_,
      };
    } else {
      item = enum_;
    }
    return {
      anyOf: [...result, item],
    };

  }

  /**
   * 处理 且：allOf 此处逻辑较复杂请慎重更改
   *
   * @param {any} typeAnnotation
   * @param {any} key
   * @returns
   */
  handleAllOfRelationDatas(typeAnnotation: AnyOption, file?: string, attrKey?: string): AnyOption {
    const result = typeAnnotation.types.reduce((prev: string[], next: (AnyOption | string)[]) => {
      const type: null | AnyOption = this.transformTypeAnnotation({ typeAnnotation: next, file, attrKey }) || {};
      return [...prev, type];
    }, []);
    return { allOf: result };
  }

  /**
   * AnyOf异常处理
   *
   * @param {AnyOption} schema
   * @param {string} [file]
   * @param {string} [attrKey]
   * @returns {AnyOption | string}
   */
  handleAnyOf(schema: AnyOption, file?: string, attrKey?: string): AnyOption | string {
    const { anyOf = [], enum: enum_ } = schema || {};

    if (enum_) {
      return schema;
    }

    let isEmpty = true;
    anyOf.forEach((item: AnyOption = {}) => {
      if (Object.keys(item).length) {
        isEmpty = false;
      }
    });

    if (isEmpty) {
      if (file && attrKey) {
        (console as Console).warn(
          chalk.yellow(
            `警告：% s 文件下的【% s】属性，类型定义较复杂，请考虑简化，它将会被解析为object类型。`,
          ),
          file,
          attrKey,
        );
      }
      schema.anyOf[0] = { type: 'object' };
    }
    return schema;
  }

  /**
   * Jsonschema 格式化
   *
   * @param {any} schema
   * @returns {any} {AnyOption}
   */
  formatJsonSchema(schema: AnyOption): null | AnyOption {
    if (!schema) {
      return {};
    }

    const { type, properties, required } = schema;
    const isDelete: string[] = [];

    // 对象类型处理
    if (type === 'object') {
      if (!properties || !required) {
        return schema;
      }

      Object.keys(properties).forEach((item: string) => {
        if (
          _.get(properties[item], 'type') === 'array' ||
          _.get(properties[item], 'type') === 'object'
        ) {
          properties[item] = this.formatJsonSchema(properties[item]);
        }
        // 交叉类型&联合类型
        else if (_.get(properties, [item, 'anyOf']) || _.get(properties, [item, 'allOf'])) {
          const arr = _.get(properties, [item, 'anyOf']) || _.get(properties, [item, 'allOf']);
          arr.forEach((item: any) => {
            this.formatJsonSchema(item);
          });
        }
        // 非 基础类型 | 枚举类型 | $ref
        else if (
          !_.get(properties, [item, 'type']) &&
          !_.get(properties, [item, '$ref']) &&
          !_.get(properties, [item, 'enum'])
        ) {
          delete properties[item];
          isDelete.push(item);
        }
      });

      required.forEach((item: string, index: number) => {
        if (isDelete.includes(item)) (required || []).splice(index, 1);
      });

      if (!Object.keys(schema.properties).length) {
        delete schema.properties;
      }

      if (!required.length) {
        delete schema.required;
      }
    }
    // 数组处理
    else if (type === 'array' && !_.get(schema, 'items')) {
      schema = {};
    }

    return schema;
  }
}
