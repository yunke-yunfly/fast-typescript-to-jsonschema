import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/tstype.ts`);
genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('type类型_1', () => {
  expect(getSchema('Type_1')).toMatchSnapshot();
});
test('type类型_2', () => {
  expect(getSchema('Type_2')).toMatchSnapshot();
});
test('type类型_3', () => {
  expect(getSchema('Type_3')).toMatchSnapshot();
});
test('type类型_4', () => {
  expect(getSchema('Type_4')).toMatchSnapshot();
});
test('type类型_5', () => {
  expect(getSchema('Type_5')).toMatchSnapshot();
});
test('type类型_6', () => {
  expect(getSchema('Type_6')).toMatchSnapshot();
});
test('type类型_7', () => {
  expect(getSchema('Type_7')).toMatchSnapshot();
});
test('type类型_8', () => {
  expect(getSchema('Type_8')).toMatchSnapshot();
});
test('type类型_9', () => {
  expect(getSchema('Type_9')).toMatchSnapshot();
});
test('type类型_10', () => {
  expect(getSchema('Type_10')).toMatchSnapshot();
});
test('type类型_11', () => {
  expect(getSchema('Type_11')).toMatchSnapshot();
});
test('type类型_数组_1', () => {
  expect(getSchema('Type_12')).toMatchSnapshot();
});
test('type类型_空对象_1', () => {
  expect(getSchema('Type_13')).toMatchSnapshot();
});

test('type类型_数组_2', () => {
  expect(getSchema('Type_14')).toMatchSnapshot();
});

