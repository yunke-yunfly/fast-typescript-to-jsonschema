import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/interface.ts`);
genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('Interface单类型类型_0', () => {
  expect(getSchema('Interface_0')).toMatchSnapshot();
});

test('Interface单类型类型_1', () => {
  expect(getSchema('Interface_1')).toMatchSnapshot();
});

test('Interface单类型类型_1', () => {
  expect(getSchema('Interface_1_1')).toMatchSnapshot();
});

test('Interface简单联合类型', () => {
  expect(getSchema('Interface_2')).toMatchSnapshot();
});

test('Interface复杂联合类型_1', () => {
  expect(getSchema('Interface_3')).toMatchSnapshot();
});

test('Interface简单数组类型_1', () => {
  expect(getSchema('Interface_4')).toMatchSnapshot();
});

test('Interface简单数组类型_2', () => {
  expect(getSchema('Interface_5')).toMatchSnapshot();
});

test('Interface简单数组类型_3', () => {
  expect(getSchema('Interface_6')).toMatchSnapshot();
});

test('Interface嵌套类型_1', () => {
  expect(getSchema('Interface_7')).toMatchSnapshot();
});

test('Interface嵌套类型_2', () => {
  expect(getSchema('Interface_8')).toMatchSnapshot();
});

test('Interface嵌套类型_3', () => {
  expect(getSchema('Interface_9')).toMatchSnapshot();
});

test('Interface嵌套类型_4', () => {
  expect(getSchema('Interface_10')).toMatchSnapshot();
});

test('Interface嵌套类型_5', () => {
  expect(getSchema('Interface_11')).toMatchSnapshot();
});

test('Interface索引类型_1', () => {
  expect(getSchema('Interface_12')).toMatchSnapshot();
});

test('Interface索引类型_2', () => {
  expect(getSchema('Interface_13')).toMatchSnapshot();
});

test('Interface索引类型_3', () => {
  expect(getSchema('Interface_14')).toMatchSnapshot();
});

test('Interface索引类型_4', () => {
  expect(getSchema('Interface_15')).toMatchSnapshot();
});

test('Interface索引类型_5', () => {
  expect(getSchema('Interface_16')).toMatchSnapshot();
});

test('Interface索引类型_6', () => {
  expect(getSchema('Interface_17')).toMatchSnapshot();
});

test('Interface索引类型_7', () => {
  expect(getSchema('Interface_21')).toMatchSnapshot();
});

test('Interface索引类型_8', () => {
  expect(getSchema('Interface_14_1')).toMatchSnapshot();
});

test('Interface索引类型_9', () => {
  expect(getSchema('Interface_14_2')).toMatchSnapshot();
});

test('Interface复杂聚合类型', () => {
  expect(getSchema('Interface_18')).toMatchSnapshot();
});

test('Interface继承类型_1', () => {
  expect(getSchema('Interface_19')).toMatchSnapshot();
});

test('Interface继承类型_2', () => {
  expect(getSchema('Interface_20')).toMatchSnapshot();
});

test('Interface复杂继承类型_3', () => {
  expect(getSchema('Interface_23')).toMatchSnapshot();
});

test('Interface无任何属性_1', () => {
  expect(getSchema('Interface_24')).toMatchSnapshot();
});

test('Interface引用过滤文件_1', () => {
  genTypeSchema.genJsonDataFormFile(file, null, ['common']);

  const getSchema = (type: string) => {
    const schema = genTypeSchema.getJsonSchema(file, type);
    return schema;
  };
  expect(getSchema('Interface_7')).toMatchSnapshot();
});

test('Interface引用npm包类型_1', () => {
  expect(getSchema('Interface_25')).toMatchSnapshot();
});