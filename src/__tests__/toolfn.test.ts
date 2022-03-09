import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/toolfn.ts`);
genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('工具函数Omit_1', () => {
  expect(getSchema('ToolFn_1')).toMatchSnapshot();
});

test('工具函数Omit_2', () => {
  expect(getSchema('ToolFn_2')).toMatchSnapshot();
});

test('工具函数Omit_3', () => {
  expect(getSchema('ToolFn_3')).toMatchSnapshot();
});

// test('工具函数Omit_4', () => {
//   expect(getSchema('ToolFn_4')).toMatchSnapshot();
// });

// test('工具函数Omit_5', () => {
//   expect(getSchema('ToolFn_5')).toMatchSnapshot();
// });

// test('工具函数Omit_6', () => {
//   expect(getSchema('ToolFn_6')).toMatchSnapshot();
// });

// test('工具函数Omit_7', () => {
//   expect(getSchema('ToolFn_7')).toMatchSnapshot();
// });

// test('工具函数Omit_8', () => {
//   expect(getSchema('ToolFn_8')).toMatchSnapshot();
// });

test('工具函数Pick_1', () => {
  expect(getSchema('ToolFn_9')).toMatchSnapshot();
});

test('工具函数Pick_2', () => {
  expect(getSchema('ToolFn_10')).toMatchSnapshot();
});

// test('工具函数Pick_3', () => {
//   expect(getSchema('ToolFn_11')).toMatchSnapshot();
// });

// test('工具函数Pick_4', () => {
//   expect(getSchema('ToolFn_12')).toMatchSnapshot();
// });

test('工具函数Record_1', () => {
  expect(getSchema('ToolFn_13')).toMatchSnapshot();
});

test('工具函数Record_2', () => {
  expect(getSchema('ToolFn_14')).toMatchSnapshot();
});

test('工具函数Record_3', () => {
  expect(getSchema('ToolFn_15')).toMatchSnapshot();
});

// test('工具函数Record_4', () => {
//   expect(getSchema('ToolFn_16')).toMatchSnapshot();
// });

// test('工具函数Record_5', () => {
//   expect(getSchema('ToolFn_17')).toMatchSnapshot();
// });

// test('工具函数Record_6', () => {
//   expect(getSchema('ToolFn_18')).toMatchSnapshot();
// });
