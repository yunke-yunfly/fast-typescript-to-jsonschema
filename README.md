# fast-typescript-to-jsonschema

[![npm version](https://img.shields.io/npm/v/fast-typescript-to-jsonschema.svg)](https://www.npmjs.com/package/fast-typescript-to-jsonschema) 
![Test](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/workflows/Test/badge.svg)
[![codecov](https://codecov.io/gh/yunke-yunfly/fast-typescript-to-jsonschema/branch/master/graph/badge.svg)](https://app.codecov.io/gh/yunke-yunfly/fast-typescript-to-jsonschema)

生成typescript类型的jsonschema数据

## 特性

- 编译Typescript文件以获取完整的类型信息
- 将所需的属性、继承、注释、属性初始值转换为jsonschema

## 使用

- 1.安装依赖

```js
yarn add fast-typescript-to-jsonschema -D
```

- 2.创建`type.ts`文件，内容如下:

```ts
interface ITest {
  attr1: string;
  attr2: number;
  attr3?: boolean;
}
```

- 3.创建`test.js`文件，内容如下:

```js
const { default: genTypeSchema } = require('fast-typescript-to-jsonschema');
const path = require('path');

// 目标文件
const file = path.resolve(__dirname, './type.ts');

// 生成数据
genTypeSchema.genJsonDataFormFile(file);

// 获得当前文件对应的所有jsonschema数据
const json = genTypeSchema.genJsonData();

// 获得具体的某个type的jsonschema数据
const jsonSchema = genTypeSchema.getJsonSchema(file, 'ITest');

// 返回结果
console.log(jsonSchema); 
```

- 4.执行脚本

```js
node ./test.js
```

`jsonSchema`返回结果如下:

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

- example 案例地址：
https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/tree/master/example

## 注释

示例1

```ts
interface Interface_1 {
  attr: string;
}
```

结果:

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

示例2

```ts
interface Interface_4 {
  attr: string[];
}
```

结果:

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


> 更多支持的类型解析[请看](docs/index.md),目录如下:

- [接口](docs/interface.md)
  - [1.1简单类型](docs/interface.md#接口)
  - [1.2联合类型](docs/interface.md#12联合类型)
  - [1.3交叉类型](docs/interface.md#13交叉类型)
  - [1.4数组类型](docs/interface.md#14数组类型)
    - [1.4.1简单数组类型](docs/interface.md#141简单数组类型)
    - [1.4.2复杂数组类型](docs/interface.md#142复杂数组类型)
  - [1.5嵌套](docs/interface.md#15嵌套)
    - [1.5.1简单嵌套](docs/interface.md#151简单嵌套)
    - [1.5.2联合嵌套](docs/interface.md#152联合嵌套)
    - [1.5.3交叉嵌套](docs/interface.md#153交叉嵌套)
    - [1.5.4数组交叉](docs/interface.md#154数组交叉)
    - [1.5.5循环嵌套](docs/interface.md#155循环嵌套)
  - [1.6索引类型](docs/interface.md#16索引类型)
- [模块](docs/module.md#模块)
  - [1.1简单导出](docs/module.md#11简单导出)
  - [1.2导出重命名](docs/module.md#12导出重命名)
- [继承](docs/extends.md#继承)
  - [1.1简单继承](docs/extends.md#11简单继承)
  - [1.2多继承](docs/extends.md#12多继承)
- [枚举](docs/enum.md#枚举)
  - [1.1数字枚举](docs/enum.md#11数字枚举)
  - [1.2字符串枚举](docs/enum.md#12字符串枚举)
  - [1.3计算枚举](docs/enum.md#13计算枚举)
  - [1.4复杂枚举](docs/enum.md#14复杂枚举)
    - [1.4.1简单接口转枚举](docs/enum.md#141简单接口转枚举)
    - [1.4.2复杂接口转枚举](docs/enum.md#142复杂接口转枚举)
- [泛型](docs/generic.md#泛型)
  - [1.1简单](docs/generic.md#11简单)
  - [1.2复杂泛型](docs/generic.md#12复杂泛型)
- [命名空间](docs/namespace.md#命名空间)
  - [1.1简单](docs/namespace.md#11简单)
  - [1.2复杂](docs/namespace.md#12复杂)
- [type类型](docs/type.md#type类型)
  - [1.1基本类型](docs/type.md#11基本类型)
  - [1.2复杂](docs/type.md#12复杂)
    - [1.2.1联合类型](docs/type.md#121联合类型)
    - [1.2.2联合数组](docs/type.md#122联合数组)
    - [1.2.2引用枚举](docs/type.md#122引用枚举)
- [工具函数](docs/toolFn.md#工具函数)
  - [1.1对象工具](docs/toolFn.md#11对象工具)
    - [1.1.1Omit](docs/toolFn.md#111omit)
      - [1.1.1.1简单](docs/toolFn.md#1111简单)
      - [1.1.1.2联合](docs/toolFn.md#1112联合)
      - [1.1.1.3引入](docs/toolFn.md#1113引入)
    - [1.1.2Pick](docs/toolFn.md#112pick)
      - [1.1.2.1简单](docs/toolFn.md#1121简单)
      - [1.1.2.2引入](docs/toolFn.md#1122引入)
- [注释](docs/note.md#注释)
  - [1.1单行注释](docs/note.md#11单行注释)
  - [1.2单行注释默认值](docs/note.md#12单行注释默认值)
  - [1.3多行注释](docs/note.md#13多行注释)
  - [1.4多行注释默认值](docs/note.md#14多行注释默认值)
  - [1.5单行多行注释默认值](docs/note.md#15单行多行注释默认值)

## 贡献

我们非常欢迎您的贡献，您可以通过以下方式与我们共建。

- 提交[GitHub 问题](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/issues)以报告错误或提出问题。
- 提出[拉取请求](https://github.com/yunke-yunfly/fast-typescript-to-jsonschema/pulls)以改进我们的代码。
- [贡献指南](CONTRIBUTING.md)。
