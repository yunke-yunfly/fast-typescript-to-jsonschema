import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/generic.ts`);
genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('Generic类型_0', () => {
  expect(getSchema('Generic_3')).toMatchSnapshot();
});

test('Generic类型_1', () => {
  expect(getSchema('Generic_4')).toMatchSnapshot();
});

test('Generic类型_2', () => {
  expect(getSchema('Generic_5')).toMatchSnapshot();
});

test('Generic类型_3', () => {
  expect(getSchema('Generic_type_1')).toMatchSnapshot();
});

test('Generic默认值_类型_1', () => {
  expect(getSchema('Generic_7')).toMatchSnapshot();
});

test('Generic默认值_类型_2', () => {
  expect(getSchema('Generic_12')).toMatchSnapshot();
});

test('Generic默认值_类型_3', () => {
  expect(getSchema('Generic_13')).toMatchSnapshot();
});

test('Generic多层对象_类型_1', () => {
  expect(getSchema('Generic_9')).toMatchSnapshot();
});

test('Generic多层对象_类型_2', () => {
  expect(getSchema('Generic_11')).toMatchSnapshot();
});

test('Generic多层对象_类型_3', () => {
  expect(getSchema('Generic_13')).toMatchSnapshot();
});

test('Generic引用别的文件_类型_1', () => {
  expect(getSchema('Generic_10')).toMatchSnapshot();
});

