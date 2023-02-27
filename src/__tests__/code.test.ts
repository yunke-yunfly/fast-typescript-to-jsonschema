import genTypeSchema from '../index';

const code = `
import AAA from './aaa'
export type Generic_10 = Generic_type_1<string>
export interface Generic_type_1<T> {
    value1: string;
    value2: T;
}
interface BBB {
    some: string;
}
export enum Role {
  Maintainer = 'Maintainer',
  Developer = 'Developer',
}
type Page = 'home' | 'about' | 'contact' | string;
interface PageInfo {
  title: string;
  some: BBB
}
`
genTypeSchema.genJsonDataFromCode(code);

const getSchema = (type: string) => {
  const schema = genTypeSchema.getJsonSchema(type);
  return schema;
};

test('枚举', () => {
  expect(getSchema('Role')).toMatchSnapshot();
});

test('Type类型', () => {
  expect(getSchema('Page')).toMatchSnapshot();
});

test('简单接口', () => {
  expect(getSchema('BBB')).toMatchSnapshot();
});

test('嵌套接口', () => {
  expect(getSchema('PageInfo')).toMatchSnapshot();
});

test('泛型', () => {
  expect(getSchema('Generic_type_1')).toMatchSnapshot();
});

test('嵌套泛型', () => {
  expect(getSchema('Generic_10')).toMatchSnapshot();
});

