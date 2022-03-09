export type AnyOption = Record<string, any>;

export interface RefTypeConfig {
  fileJson: AnyOption;
  typeJson: AnyOption;
  typeJson_?: AnyOption;
  type?: string;
}

export interface GetJsonschemaToJsonConfig {
  jsonschema: AnyOption;
  definitions?: AnyOption;
  isRequired?: boolean;
  description?: string;
  refKey?: string;
}

export type ItemType = Record<
  string,
  {
    type: string;
    description?: string;
    required?: boolean;
  }
>;

export interface TypeParamsDefaultType {
  name: string;
  default: AnyOption;
}

export interface JsonschemaToJsonConfig {
  type?: string | AnyOption;
  properties?: AnyOption;
  required?: string[];
  key?: string;
  description?: string;
  definitions?: AnyOption;
}

export interface TypeAnnotationConfig {
  typeAnnotation: AnyOption;
  file?: string;
  attrKey?: string;
  refKey?: string;
}

export interface TSTypeAnnotationConfig {
  node: AnyOption;
  parentKey?: string;
  file?: string;
}

export type EntryType = { keySet: Set<string>; times: number };
