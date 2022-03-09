import * as path from 'path';

import genTypeSchema from '../index';

const file = path.join(__dirname, `../../jest/namespace.ts`);
genTypeSchema.genJsonDataFormFile(file);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(file, type);
  return schema;
};

test('namespace案例_1', () => {
  expect(getSchema('Namespace_1')).toMatchSnapshot();
});

test('namespace案例_2', () => {
  expect(getSchema('Namespace_2')).toMatchSnapshot();
});

test('namespace案例_3', () => {
  expect(getSchema('Namespace_3')).toMatchSnapshot();
});

test('namespace案例_4', () => {
  expect(getSchema('Namespace_4')).toMatchSnapshot();
});
