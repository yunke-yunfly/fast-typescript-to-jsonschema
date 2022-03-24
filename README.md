# fast-typescript-to-jsonschema

[![npm version](https://img.shields.io/npm/v/fast-typescript-to-jsonschema.svg)](https://www.npmjs.com/package/fast-typescript-to-jsonschema) 
![Test](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/workflows/Test/badge.svg)
[![codecov](https://codecov.io/gh/yunke-yunfly/fast-typescript-to-jsonschema/branch/master/graph/badge.svg)](https://app.codecov.io/gh/yunke-yunfly/fast-typescript-to-jsonschema)

English | [简体中文](./README.zh-cn.md)

a tool generate json schema from typescript.

## Feature

- compile Typescript to get all type information
- convert properties, extends, annotations, and initial values to jsonschema

## Usage

1. install

```bash
yarn add fast-typescript-to-jsonschema -D
```

2. create `type.ts`

```ts
interface ITest {
  attr1: string;
  attr2: number;
  attr3?: boolean;
}
```

3. create `test.js`

```js
const { default: genTypeSchema } = require('fast-typescript-to-jsonschema');
const path = require('path');

// target file
const file = path.resolve(__dirname, './type.ts');

// generate data
genTypeSchema.genJsonDataFormFile(file);

// get all jsonschema data of current file
const json = genTypeSchema.genJsonData();

// get jsonschema of specific type
const jsonSchema = genTypeSchema.getJsonSchema(file, 'ITest');

// result
console.log(jsonSchema); 
```

4. execute script

```js
node ./test.js
```

`jsonSchema` result:

```json
{
  "additionalProperties": false,
  "properties": {
    "attr1": {
      "type": "string",
    },
    "attr2": {
      "type": "number",
    },
    "attr3": {
      "type": "boolean",
    },
  },
  "required": [
    "attr1",
    "attr2",
  ],
  "type": "object",
}
```

see more examples at [example](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/tree/master/example).

## Comments

Example1

```ts
interface Interface_1 {
  attr: string;
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "attr": {
      "type": "string",
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

Example2

```ts
interface Interface_4 {
  attr: string[];
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "attr": {
      "items": {
        "type": "string",
      },
      "type": "array",
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

> Read more supported types [here](docs/index.en-US.md)

- [Interface](docs/interface.en-US.md)
  - [1.1 Basic Types](docs/interface.en-US.md#11-basic-types)
  - [1.2 Union Types](docs/interface.en-US.md#12-union-types)
  - [1.3 Intersection Types](docs/interface.en-US.md#13-intersection-types)
  - [1.4 Array Types](docs/interface.en-US.md#14-array-types)
    - [1.4.1 Basic Array Types](docs/interface.en-US.md#141-basic-array-types)
    - [1.4.2 Complex Array Types](docs/interface.en-US.md#142-complex-array-types)
  - [1.5 Nesting](docs/interface.en-US.md#15-nesting)
    - [1.5.1 Nested Basic Types](docs/interface.en-US.md#151-nested-basic-types)
    - [1.5.2 Nested Union Types](docs/interface.en-US.md#152-nested-union-types)
    - [1.5.3 Nested Intersection Types](docs/interface.en-US.md#153-nested-intersection-types)
    - [1.5.4 Nested Intersection Array Types](docs/interface.en-US.md#154-nested-intersection-array-types)
    - [1.5.5 Nested loop](docs/interface.en-US.md#155-nested-loop)
  - [1.6 Index Types](docs/interface.en-US.md#16-index-types)
- [Modules](docs/module.en-US.md#modules)
  - [1.1 Basic Modules](docs/module.en-US.md#11-basic-modules)
  - [1.2 Named Export Modules](docs/module.en-US.md#12-named-export-modules)
- [Extending Types](docs/extends.en-US.md#extending-types)
  - [1.1 Basic Extending Types](docs/extends.en-US.md#11-basic-extending-types)
  - [1.2 Multiple Extending Types ](docs/extends.en-US.md#12-multiple-extending-types)
- [Enums](docs/enum.en-US.md#enums)
  - [1.1 Numeric Enums](docs/enum.en-US.md#11-numeric-enums)
  - [1.2 String Enums](docs/enum.en-US.md#12-string-enums)
  - [1.3 Computed Enums](docs/enum.en-US.md#13-computed-enums)
  - [1.4 Complex Enums](docs/enum.en-US.md#14-complex-enums)
    - [1.4.1 Basic Interface to Enums](docs/enum.en-US.md#141-basic-interface-to-enums)
    - [1.4.2 Complex Interface to Enums](docs/enum.en-US.md#142-complex-interface-to-enums)
- [Generics](docs/generic.en-US.md#generics)
  - [1.1 Basic Generics](docs/generic.en-US.md#11-basic-generics)
  - [1.2 Complex Generics](docs/generic.en-US.md#12-complex-generics)
- [Namespaces](docs/namespace.en-US.md#namespaces)
  - [1.1 Basic Namespaces](docs/namespace.en-US.md#11-basic-namespaces)
  - [1.2 Complex Namespaces](docs/namespace.en-US.md#12-complex-namespaces)
- [Type](docs/type.en-US.md#type)
  - [1.1 Basic Types](docs/type.en-US.md#11-basic-types)
  - [1.2 Complex Types](docs/type.en-US.md#12-complex-types)
    - [1.2.1 Union Types](docs/type.en-US.md#121-union-types)
    - [1.2.2 Union Array Types](docs/type.en-US.md#122-union-array-types)
    - [1.2.2 Import Enums](docs/type.en-US.md#122-import-enums)
- [Utility Types](docs/toolFn.en-US.md#utility-types)
  - [1.1 Utility for Objects](docs/toolFn.en-US.md#11-utility-for-objects)
    - [1.1.1 Omit](docs/toolFn.en-US.md#111-omit)
      - [1.1.1.1 Basic Omit](docs/toolFn.en-US.md#1111-basic-omit)
      - [1.1.1.2 Union Omit](docs/toolFn.en-US.md#1112-union-omit)
      - [1.1.1.3 Import Omit](docs/toolFn.en-US.md#1113-import-omit)
    - [1.1.2 Pick](docs/toolFn.en-US.md#112-pick)
      - [1.1.2.1 Basic Pick](docs/toolFn.en-US.md#1121-basic-pick)
      - [1.1.2.2 Import Pick](docs/toolFn.en-US.md#1122-import-pick)
    - [1.1.3 Record](docs/toolFn.en-US.md#112-record)
      - [1.1.2.1 Basic Record](docs/toolFn.en-US.md#1121-basic-record)
      - [1.1.2.2 Import Record](docs/toolFn.en-US.md#1122-import-record)
- [Type Annotations](docs/note.en-US.md#type-annotations)
  - [1.1 Single-line annotations](docs/note.en-US.md#11-single-line-annotations)
  - [1.2 Single-line annotations with default value](docs/note.en-US.md#12-single-line-annotations-with-default-value)
  - [1.3 Multi-line annotations](docs/note.en-US.md#13-multi-line-annotations)
  - [1.4 Multi-line annotations with default value](docs/note.en-US.md#14-multi-line-annotations-with-default-value)
  - [1.5 Mixed annotations with default value](docs/note.en-US.md#15-mixed-annotations-with-default-value)

## Contribution

Contributions are extremely welcomed by our team, you can contribute to this repository by several ways below.

- Submit [GitHub Issue](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/issues) to report errors or ask questions
- Create [Pull Request](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/pulls) to improve our code
- [Contribution guide](./CONTRIBUTING.en-US.md)
