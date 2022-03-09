import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/module.ts`);

genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('Module重命名模块_0', () => {
  expect(getSchema('Module_0')).toMatchSnapshot();
});

test('Module重命名模块多文件_0', () => {
  expect(getSchema('Module_1')).toMatchSnapshot();
});

test('Module多文件全部导出_0', () => {
  expect(getSchema('Module_2')).toMatchSnapshot();
});

test('Module多文件按组导出_0', () => {
  expect(getSchema('Module_3')).toMatchSnapshot();
});

test('Module多文件按组默认导出_0', () => {
  expect(getSchema('Module_4')).toMatchSnapshot();
});

test('Module多文件命名空间导出_0', () => {
  expect(getSchema('Module_5')).toMatchSnapshot();
});

test('Module多文件默认导出_0', () => {
  expect(getSchema('Module_6')).toMatchSnapshot();
});
