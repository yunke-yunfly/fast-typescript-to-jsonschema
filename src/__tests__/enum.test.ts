import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/enum.ts`);
genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('枚举_0', () => {
  expect(getSchema('Enum_0')).toMatchSnapshot();
});

test('枚举_1', () => {
  expect(getSchema('Enum_1')).toMatchSnapshot();
});

test('枚举_2', () => {
  expect(getSchema('Enum_2')).toMatchSnapshot();
});

test('枚举_3', () => {
  expect(getSchema('Enum_3')).toMatchSnapshot();
});

test('枚举_4', () => {
  expect(getSchema('Enum_4')).toMatchSnapshot();
});

test('枚举_5', () => {
  expect(getSchema('Enum_5')).toMatchSnapshot();
});

test('枚举_6', () => {
  expect(getSchema('Enum_6')).toMatchSnapshot();
});

test('枚举_7_空枚举', () => {
  expect(getSchema('Enum_7')).toMatchSnapshot();
});

test('接口转换为枚举类_1', () => {
  expect(getSchema('Interface_To_Enum_1')).toMatchSnapshot();
});

test('接口转换为枚举类_2', () => {
  expect(getSchema('Interface_To_Enum_2')).toMatchSnapshot();
});

test('接口转换为枚举类_3', () => {
  expect(getSchema('Interface_To_Enum_3')).toMatchSnapshot();
});

test('接口转换为枚举类_4', () => {
  expect(getSchema('Interface_To_Enum_4')).toMatchSnapshot();
});
