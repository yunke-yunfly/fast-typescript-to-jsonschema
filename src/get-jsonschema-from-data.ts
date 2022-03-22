/** 2021-07-12 wangw19@mingyuanyun.com ts类型转换为jsonschema 解析ts类型文件，与ts文件中的类型定义 */
import * as _ from 'lodash';

// types
import type { AnyOption, TypeParamsDefaultType } from './types';
import typescriptToFileDatas, { ImportType } from './typescript-to-file-datas';
// utils
import { randomString } from './utils';
// require
const merge = require('deepmerge');

/**
 * 处理ts type 类型，生成 jsonschema
 *
 * @class genTypeSchema
 * @export
 */
export default class genTypeSchema extends typescriptToFileDatas {
  tsTollFn: string[];

  constructor() {
    super();
    this.tsTollFn = ['Omit', 'Pick', 'Record', 'Partial', 'Required'];
  }

  /**
   * 获得某个具体type类型的jsonschema
   *
   * @memberof genTypeSchema
   * @param {string} type
   * @returns {any} {(null | AnyOption)}
   */
  getJsonSchema(
    file: string,
    type: string,
    entry?: { keySet: Set<string>; refKeyTime: Record<string, number> },
  ): AnyOption {
    if (!entry) {
      entry = { keySet: new Set(), refKeyTime: {} };
    }
    if (!file || !type) return { type: 'object' };

    // 处理 Param.C.D.E.F.GetBaseDetailResponse 这种外部导入路径
    const [firstKey, ...otherKeys] = type.split('.');

    const fileJson = _.get(this.jsonData, [file]) || {};

    // 兼容处理
    let typeJson = _.get(fileJson, [type]) || _.get(fileJson, [firstKey]) || {};

    if (typeJson.$ref && type && !typeJson.items) {
      const refFile = typeJson.$ref.replace(/#\/definitions|#/, '');
      // 处理namespace引入类型
      if (typeJson.type === ImportType.ImportNamespaceSpecifier) {
        type = otherKeys.join('.');
      }

      if (_.get(this.jsonData, [refFile])) {
        typeJson = this.getJsonSchema(
          refFile,
          typeJson.from ? type.replace(/.+?(?=\.)|.+/, typeJson.from) : type,
          entry,
        );

        return typeJson;
      }
    }

    typeJson = this.genJsonschema(fileJson, typeJson, entry, file);

    if (!typeJson || !Object.keys(typeJson).length) {
      typeJson = { type: 'object' };
    }

    // 循环引用
    if (entry.refKeyTime[type] > 1) {
      typeJson.definitions = typeJson.definitions || {};
      const cloneTypeJson = _.cloneDeep(typeJson);
      if (cloneTypeJson.definitions) {
        // 删除相同类型
        delete cloneTypeJson.definitions[type];
        if (!Object.keys(cloneTypeJson.definitions).length) {
          delete cloneTypeJson.definitions;
        }
      }
      typeJson.definitions[type] = cloneTypeJson;
    }
    return typeJson;
  }

  /**
   * 处理$ref 此处逻辑较复杂，判断条件较多，请慎重更改
   *
   * @memberof genTypeSchema
   * @param {AnyOption} jsonschema
   */
  genJsonschema(
    fileJson: AnyOption,
    typeJson: AnyOption,
    entry?: { keySet: Set<string>; refKeyTime: Record<string, number> },
    file?: string,
  ): null | AnyOption {
    if (!entry) {
      entry = { keySet: new Set(), refKeyTime: {} };
    }

    // 深度克隆，防止串改
    typeJson = _.cloneDeep(typeJson);
    const { properties, additionalProperties, extends: extends_, enum: enum_ } = typeJson || {};

    // 枚举类型直接返回
    if (enum_) {
      return typeJson;
    }
    // 基础数据类型，非object/array数据类型直接返回
    if (typeJson.type && typeJson.type !== 'object' && typeJson.type !== 'array') {
      return typeJson;
    }
    // object类型
    if (typeJson.type === 'object' && !properties && !additionalProperties && !extends_) {
      return typeJson;
    }

    const handleCommonRef = (result: null | AnyOption, $refKey: string) => {
      if (!result) return;
      const definitions_ = _.get(result, 'definitions') || {};
      delete result.definitions;
      delete result.typeParams;
      const definitions = { [$refKey]: result, ...definitions_ };
      typeJson.definitions = { ...typeJson.definitions, ...definitions };
    };

    // 泛型，替换ref
    const handleReplacePropertyRef = (
      definitions: AnyOption,
      replaceProperty: AnyOption,
      replaceRefParamNames: string[],
      extraParams: any[],
    ) => {
      const findIndex = replaceRefParamNames.findIndex(
        (name) =>
          name === replaceProperty.$ref ||
          `#/definitions/${name.replace(/#\/definitions|#/, '')}` === replaceProperty.$ref,
      );
      if (findIndex > -1) {
        delete replaceProperty.$ref;
        Object.assign(replaceProperty, extraParams[findIndex]);
        if (definitions) {
          const delName = replaceRefParamNames[findIndex].replace(/#\/definitions|#/, '');
          if (definitions[delName] && !Object.keys(definitions[delName]).length) {
            delete definitions[delName];
          }
        }
      }
    }

    // 泛型，替换值
    const handleReplaceProperties = (
      definitions: AnyOption = {},
      replaceProperties: AnyOption = {},
      replaceRefParamNames: string[] = [],
      extraParams: any[],
    ) => {
      if (replaceProperties.$ref) {
        handleReplacePropertyRef(definitions, replaceProperties, replaceRefParamNames, extraParams);
        return;
      }
      Object.keys(replaceProperties).forEach((key) => {
        if (replaceProperties[key].$ref) {
          handleReplacePropertyRef(definitions, replaceProperties[key], replaceRefParamNames, extraParams);
          return;
        }
        if (replaceProperties[key].type) {
          if (replaceProperties[key].type === 'object') {
            handleReplaceProperties(definitions, replaceProperties[key].properties, replaceRefParamNames, extraParams);
            return;
          }
          if (replaceProperties[key].type === 'array' && replaceProperties[key].items) {
            const { items } = replaceProperties[key];
            handleReplaceProperties(definitions, items, replaceRefParamNames, extraParams);
          }
        }
      });
    };

    const handleGeneric = (result: AnyOption) => {
      if (result.$realRef && result.items && result.items.extraParams) {
        const name = result.$ref.replace('#', '');
        // 已解析过
        if (fileJson[name] && !fileJson[name].$realRef && !fileJson[name].extraParams) {
          delete result.$realRef;
          delete result.items.extraParams;
          return;
        }
        const { extraParams } = result.items;
        let realRef = fileJson[result.$realRef];
        if (!realRef) {
          return;
        }
        // 别的文件ref
        if (realRef.$ref && realRef.type !== ImportType.ImportNamespaceSpecifier) {
          const refFile = realRef.$ref.replace(/#\/definitions|#/, '');
          const realSchema = this.getJsonSchema(refFile, result.$realRef);
          delete realRef.$ref;
          delete realRef.from;
          Object.assign(realRef, realSchema);
        }
        if (!realRef.typeParams ||
          Object.keys(realRef.typeParams).length !== extraParams.length
        ) {
          return;
        }
        realRef = _.cloneDeep(realRef);
        const replaceRefParamNames: string[] = [];
        extraParams.forEach((item: any, i: number) => {
          if (item.$realRef && item.items && item.items.extraParams) {
            handleGeneric(item);
          }
          if (typeof realRef.typeParams[i] === 'string') {
            replaceRefParamNames.push(`#${realRef.typeParams[i]}`);
          } else {
            replaceRefParamNames.push(`#${realRef.typeParams[i].name}`);
          }
        });
        handleReplaceProperties(realRef.definitions, realRef.properties, replaceRefParamNames, extraParams);
        delete realRef.typeParams;
        delete result.$realRef;
        delete result.items.extraParams;
        if (!Object.keys(result.items).length) {
          delete result.items;
        }
        if (file) {
          this.extendJsonData(file, name, realRef);
        }
        fileJson[name] = fileJson[name] || _.cloneDeep(realRef);
      }
      // 对象类型
      if (result.properties && Object.keys(result.properties)) {
        // eslint-disable-next-line guard-for-in
        for (const key in result.properties) {
          const item = result.properties[key] || {};
          if (item.$ref) {
            const name = item.$ref.replace('#', '');
            let ref = fileJson[name];
            if (ref && ref.$realRef && ref.$ref && ref.items && ref.items.extraParams) {
              item.$ref = ref.$ref;
              item.$realRef = ref.$realRef;
              item.items = ref.items;
            }
          }
          handleGeneric(item);
        }
      }
    };

    // 处理泛型默认类型参数
    const handleGenericDefaultType = (genericProperties: AnyOption, typeParams: Record<string, AnyOption>): string[] => {
      if (!typeParams || !Object.keys(typeParams).length || !Object.keys(genericProperties).length) {
        return [];
      }
      // 有默认值
      const extraParams: any[] = [];
      const replaceRefParamNames: string[] = [];
      const defaultNames: string[] = [];
      Object.keys(typeParams).forEach(index => {
        if (typeof typeParams[index] === 'object') {
          const item = typeParams[index] as TypeParamsDefaultType;
          extraParams.push(item.default);
          replaceRefParamNames.push(`#${item.name}`);
          if (item.default.type) {
            defaultNames.push(item.default.type);
          } else if (item.default.$ref) {
            defaultNames.push(item.default.$ref.replace(/#/g, ''));
          }
        }
      });
      handleReplaceProperties({}, genericProperties, replaceRefParamNames, extraParams);
      return defaultNames;
    }

    // 处理继承
    const handleExtends = (item: AnyOption) => {
      const newTypeJson = this.getJsonSchema(file as string, item.extends, entry);
      if (newTypeJson) {
        const result = newTypeJson.$ref
          ? this.getJsonSchema(newTypeJson.$ref.replace(/#/g, ''), item.extends, entry)
          : this.genJsonschema(fileJson, newTypeJson, entry);
        if (typeof result === 'object') {
          item = merge(result, item, {
            customMerge: (key: string) => {
              if (key === 'required') {
                return (target: string[], source: string[]) => {
                  return Array.from(new Set([...source, ...target]));
                };
              }
            },
          });
        }
      }
      delete item.extends;
      return item;
    };

    const attrCommonHandle = (item: AnyOption, handle: boolean = true) => {
      let $refKey = item.$ref.replace(/#(\/definitions\/)?/, '');

      item.$ref = `#/definitions/${$refKey}`;

      // 处理 definitions/Param.C.D.E.F.GetBaseDetailResponse 这种外部导入路径
      const [firstKey, ...otherKeys] = $refKey.split('.');

      // 兼容import外部引入与内部引用两种方式
      let $refJson = fileJson[firstKey] || fileJson[$refKey] || {};
      $refJson = _.cloneDeep($refJson)
      if ((entry as any).keySet.has($refKey)) {
        (entry as any).refKeyTime[$refKey] = ((entry as any).refKeyTime[$refKey] || 0) + 1;
        return;
      }

      (entry as any).keySet.add($refKey);
      (entry as any).refKeyTime[$refKey] = ((entry as any).refKeyTime[$refKey] || 0) + 1;
      // 处理namespace方式导入的types
      if ($refJson.type === ImportType.ImportNamespaceSpecifier) {
        $refKey = otherKeys.join('.');
      }

      item.$ref = `#/definitions/${$refKey}`;

      if (!$refJson.$ref) {
        // 有继承
        if ($refJson.extends) {
          $refJson = handleExtends($refJson);
        }
        if ($refJson.typeParams) {
          const defaultTypeNames = handleGenericDefaultType($refJson.properties, $refJson.typeParams);
          if (defaultTypeNames.length) {
            $refKey = `${$refKey}<${defaultTypeNames.join(',')}>`;
            item.$ref = `#/definitions/${$refKey}`;
          }
        }
        // 当前文件中的type
        const result: null | AnyOption = this.genJsonschema(fileJson, $refJson, entry);

        handle && handleCommonRef(result, $refKey);
        return result;
      }
      // import外部文件的type
      const $dependRefKey = $refJson.$ref.replace('#', '');
      const result: null | AnyOption = this.getJsonSchema(
        $dependRefKey,
        $refJson.from ? $refKey.replace(/.+?(?=\.)|.+/, $refJson.from) : $refKey,
        entry,
      );
      handle && handleCommonRef(result, $refKey);
      return result;
    };

    // 数组通用处理
    const commonArrayHandle = (typeJson: AnyOption) => {
      if (_.get(typeJson, 'items') && _.get(typeJson, 'items.$ref')) {
        commonRefHandle(typeJson.items);
      } else if (_.get(typeJson, 'items') && _.get(typeJson, 'items.properties')) {
        const properties = typeJson.items.properties || {};
        for (const key in properties) {
          if (properties[key].type === 'array') {
            commonArrayHandle(properties[key]);
          }
        }
      } else {
        const itemArr =
          _.get(typeJson, 'allOf') ||
          _.get(typeJson, 'anyOf') ||
          _.get(typeJson, 'items.anyOf') ||
          _.get(typeJson, 'items.allOf') ||
          [];
        itemArr.forEach((item: AnyOption) => {
          if (typeof item === 'object' && item.$ref) {
            commonRefHandle(item);
          }
        });
      }
    };

    // 交叉类型 & 联合类型 通用函数
    const allOfAnyOfHandle = (typeJson: AnyOption) => {
      if (!typeJson.type && (typeJson.anyOf || typeJson.allOf)) {
        const itemArr = _.get(typeJson, 'allOf') || _.get(typeJson, 'anyOf') || [];
        itemArr.forEach((item: AnyOption) => {
          if (typeof item === 'object' && item.$ref) {
            commonRefHandle(item);
          } else if (typeof item === 'object' && item.type === 'array') {
            commonArrayHandle(item);
          }
        });
      }
    };

    const deleteJsonSchemaKeys = (jsonSchema: AnyOption, keys: string[]) => {
      if (!jsonSchema || jsonSchema.type !== 'object' || !keys.length) {
        return jsonSchema;
      }
      Object.keys(jsonSchema.properties).forEach((item: string) => {
        if (keys.includes(item)) {
          delete jsonSchema.properties[item];
        }
      });
      if (jsonSchema.required && jsonSchema.required.length) {
        jsonSchema.required = jsonSchema.required.filter((item: string) => {
          return !keys.includes(item);
        });
      }
      return jsonSchema;
    };

    const selectJsonSchemaKeys = (jsonSchema: AnyOption, keys: string[]) => {
      if (!jsonSchema || jsonSchema.type !== 'object' || !keys.length) {
        return jsonSchema;
      }
      Object.keys(jsonSchema.properties || {}).forEach((item: string) => {
        if (!keys.includes(item)) {
          delete jsonSchema.properties[item];
        }
      });
      if (jsonSchema.required && jsonSchema.required.length) {
        jsonSchema.required = jsonSchema.required.filter((item: string) => {
          return keys.includes(item);
        });
      }
      return jsonSchema;
    };

    const commonTsToolResHandle = (res: AnyOption, $refKey: string) => {
      if (_.get(typeJson, '$ref')) {
        typeJson = res;
      } else {
        handleCommonRef(res, $refKey);
        return { $ref: `#/definitions/${$refKey}` };
      }
    };

    const OmitPickHandle = (key: string, type: AnyOption, extra: AnyOption) => {
      let resType: any;
      if (type.properties) {
        resType = _.cloneDeep(this.genJsonschema(fileJson, type, entry, file) as AnyOption);
      } else if (type.$ref) {
        resType = _.cloneDeep(attrCommonHandle(type, false) as AnyOption);
      }

      if (!extra) return resType;

      if (resType) {
        if (extra && extra.$ref) {
          extra = _.cloneDeep(attrCommonHandle(extra, false) as AnyOption);
        }
        const extraKeys = extra.enum || [];
        if (key === 'Omit') {
          const res = deleteJsonSchemaKeys(resType, extraKeys);
          const $refKey = `Omit${randomString(10)}`;
          return commonTsToolResHandle(res, $refKey);
        }
        if (key === 'Pick') {
          const res = selectJsonSchemaKeys(resType, extraKeys);
          const $refKey = `Pick${randomString(10)}`;
          return commonTsToolResHandle(res, $refKey);
        }
      }
    };

    const PartialRequiredHandle = (key: string, type: AnyOption) => {
      let resType: any;
      if (type.properties) {
        resType = _.cloneDeep(this.genJsonschema(fileJson, type, entry, file) as AnyOption);
      } else if (type.$ref) {
        resType = _.cloneDeep(attrCommonHandle(type, false) as AnyOption);
      }

      if (resType) {
        if (key === 'Partial') {
          delete resType.required;
          return resType;
        }
        if (key === 'Required') {
          delete resType.required;
          if (resType.properties) {
            resType.required = Object.keys(resType.properties)
          }
          return resType;
        }
      }
    };

    const RecordHandle = (key: string, type: AnyOption, extra: AnyOption) => {
      let resType: any;
      if (type.$ref) {
        resType = _.cloneDeep(attrCommonHandle(type, false) as AnyOption);
      } else {
        resType = type;
      }
      if (!extra) return resType;

      const extrares = _.cloneDeep(this.genJsonschema(fileJson, extra, entry, file) as AnyOption);
      const extraresDefinitions = extrares.definitions || {};
      delete extrares.definitions;
      const jsonSchema: AnyOption = {
        additionalProperties: false,
        type: 'object',
        properties: {},
        required: [],
        definitions: {
          ...extraresDefinitions,
        },
      };

      const commonEnum = (opt: any[]) => {
        opt.forEach((item: any) => {
          if (typeof item === 'string') {
            jsonSchema.properties[item] = extrares;
            jsonSchema.required.push(item);
          }
        });
      };

      if (resType.anyOf) {
        resType.anyOf.forEach((item: AnyOption) => {
          if (item.enum) {
            commonEnum(_.get(item, 'enum.enum') || _.get(item, 'enum'));
          } else if (['number', 'string', 'boolean'].includes(item.type)) {
            jsonSchema.additionalProperties = extrares;
          }
        });
      } else if (resType.enum) {
        commonEnum(resType.enum);
      } else {
        jsonSchema.additionalProperties = extrares;
      }

      if (!jsonSchema.required.length) delete jsonSchema.required;

      if (!Object.keys(jsonSchema.properties).length) delete jsonSchema.properties;

      if (!Object.keys(jsonSchema.definitions).length) delete jsonSchema.definitions;

      const $refKey = `Record${randomString(10)}`;
      return commonTsToolResHandle(jsonSchema, $refKey);
    };

    // 处理工具函数 Omit,Pick,Record,Partial,Required
    const handleTsToolFunction = (item: AnyOption) => {
      const key = _.get(item, '$ref').replace(/#/, '');
      const items = _.get(item, 'items') || {};
      delete item.items;
      const { type = {}, extra, $ref } = items;
      switch (key) {
        case 'Omit':
        case 'Pick':
          return OmitPickHandle(key, type, extra);
        case 'Record':
          return RecordHandle(key, type, extra);
        case 'Partial':
        case 'Required':
          return PartialRequiredHandle(key, $ref ? { $ref } : items);
        default:
          item.items = items;
      }
    };

    const commonRefHandle = (item: AnyOption) => {
      if (!item.$ref) {
        return;
      }
      if (_.get(item, 'items') && this.tsTollFn.includes(_.get(item, '$ref').replace(/#/, ''))) {
        const res = handleTsToolFunction(item);
        delete item.$ref;
        res && Object.assign(item, res);
      } else if (typeof item === 'object') {
        delete item.items;
        let handle = true;
        const $refKey = item.$ref.replace(/#(\/definitions\/)?/, '');
        if (typeJson.definitions && Object.keys(typeJson.definitions[$refKey] || {}).length) {
          handle = false;
        }
        attrCommonHandle(item, handle);
      }
    };

    const attrHandle = (item: AnyOption) => {
      if (item.$ref) {
        commonRefHandle(item);
      } else if (item.allOf || item.anyOf) {
        allOfAnyOfHandle(item);
      } else if (item.items && (_.get(item, 'items.anyOf') || _.get(item, 'items.allOf'))) {
        const itemArr = _.get(item, 'items.anyOf') || _.get(item, 'items.allOf');
        itemArr.forEach((item: AnyOption) => {
          if (typeof item === 'object' && item.$ref) {
            commonRefHandle(item);
          }
        });
      } else if (item.items && item.items.$ref) {
        commonRefHandle(item.items);
      } else if (item.properties) {
        const res = this.genJsonschema(fileJson, item, entry, file) as AnyOption;
        Object.assign(item, res);
        item.additionalProperties = item.additionalProperties || false;
        if (item.definitions) {
          typeJson.definitions = { ...typeJson.definitions, ...item.definitions };
          delete item.definitions;
        }
      }
    };

    const handleRefType = (typeJson_: AnyOption) => {
      commonRefHandle(typeJson_);
      const { definitions, $ref } = typeJson_;
      if ($ref && definitions) {
        const key = $ref.replace(/#\/definitions\//, '');
        const res = definitions[key] || { definitions: {} };
        delete typeJson_.definitions[key];
        res.definitions = { ...res.definitions, ...typeJson_.definitions };
        typeJson = res;
      }
    };

    // generic
    handleGeneric(typeJson);

    // ref
    handleRefType(typeJson);

    // anyOf|allOf
    allOfAnyOfHandle(typeJson);

    // 数组类型
    if (typeJson.type === 'array') {
      commonArrayHandle(typeJson);
    }

    // 判断是否有继承
    if (typeJson.extends) {
      typeJson = handleExtends(typeJson);
    }


    // 对象类型
    if (typeJson.properties && Object.keys(typeJson.properties)) {
      // eslint-disable-next-line guard-for-in
      for (const key in typeJson.properties) {
        const item = typeJson.properties[key] || {};
        attrHandle(item);
      }
    }

    // 索引类型处理
    if (typeJson.additionalProperties && Object.keys(typeJson.additionalProperties)) {
      if (_.get(typeJson, 'additionalProperties.type') === 'object') {
        const res = this.genJsonschema(
          fileJson,
          typeJson.additionalProperties,
          entry,
          file,
        ) as AnyOption;
        if (_.get(res, 'definitions')) {
          typeJson.definitions = { ...typeJson.definitions, ...res.definitions };
          delete res.definitions;
        }
        typeJson.additionalProperties = res;
      } else {
        attrHandle(typeJson.additionalProperties);
      }
    }

    return typeJson;
  }
}
