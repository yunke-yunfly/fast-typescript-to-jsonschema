import * as path from 'path';

import genTypeSchema, { genAst } from '../index';
import traverse from '@babel/traverse';

const rootPathReg = new RegExp(path.resolve(__dirname, '../..').replace(/\\/g, '\\\\\\\\'), 'g');

const file = path.join(__dirname, `../../jest/other.ts`);
const testError = path.join(__dirname, `error.md`);
genTypeSchema.genJsonDataFormFile(file);

/**
 * 获取相对项目根目录的相对路径
 *
 * @param {string} path // 绝对路径
 * @return {string} // 相对路径
 */
const getRelativePath = (path: any) => {
  const stringify = JSON.stringify(path).replace(rootPathReg, '').replace(/\\\\/g, '/')
  return JSON.parse(stringify);
}

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('获得所有转化之后的JSON Data', () => {
  const jsonData = genTypeSchema.genJsonData();
  expect(getRelativePath(jsonData)).toMatchSnapshot();
});

test('获得已换成的文件', () => {
  const cacheFiles = genTypeSchema.getCacheFiles();
  expect(getRelativePath(cacheFiles)).toMatchSnapshot();
});

test('获得namespace中的类型', () => {
  expect(getSchema('Param.A')).toMatchSnapshot();
});

test('interface循环嵌套类型', () => {
  expect(getSchema('Other_4')).toMatchSnapshot();
});

test('获得ts代码中导出的类型', () => {
  expect(getSchema('Other_5')).toMatchSnapshot();
});

test('包含错误文件_不影响之前文件_1', () => {
  genTypeSchema.genJsonDataFormFile(testError);
  expect(getSchema('Other_5')).toMatchSnapshot();
});

test('获取注释_1', () => {
  const ast = genAst(path.join(__dirname, `../../jest/doc.ts`))
  let desc = '';
  traverse(ast as any, {
    TSInterfaceDeclaration: (path) => {
      if (path.node && path.node.id && path.node.id.name === 'doc_5') {
        desc = genTypeSchema.getSimpleDescription(path.node);
      }
    },
  });

  expect(desc).toBe('单多行注释默认值');
});

test('Promise_1', () => {
  expect(getSchema('Other_6')).toMatchSnapshot();
});

test('测试方法边界情况_genJsonschema', () => {
  const resultGenJsonschema = genTypeSchema.genJsonschema({}, {});
  expect(resultGenJsonschema).toMatchObject({});
});

test('测试方法边界情况_getJsonSchema', () => {
  const resultGetJsonSchemaTest1 = genTypeSchema.getJsonSchema('test', 'test');
  expect(resultGetJsonSchemaTest1).toMatchObject({});

  const resultGetJsonSchema = genTypeSchema.getJsonSchema('', 'test')
  expect(resultGetJsonSchema).toMatchObject({});
});
