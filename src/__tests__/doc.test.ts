import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/doc.ts`);
genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('单行注释', () => {
  expect(getSchema('doc_1')).toMatchSnapshot();
});

test('多行注释', () => {
  expect(getSchema('doc_2')).toMatchSnapshot();
});

test('单行注释默认值', () => {
  expect(getSchema('doc_3')).toMatchSnapshot();
});

test('多行注释默认值', () => {
  expect(getSchema('doc_4')).toMatchSnapshot();
});

test('单多行注释默认值', () => {
  expect(getSchema('doc_5')).toMatchSnapshot();
});
