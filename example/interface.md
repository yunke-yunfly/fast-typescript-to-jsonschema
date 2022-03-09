- [接口](#接口)
  - [1.1简单类型](#11简单类型)
  - [1.2联合类型](#12联合类型)
  - [1.3交叉类型](#13交叉类型)
  - [1.4数组类型](#14数组类型)
    - [1.4.1简单数组类型](#141简单数组类型)
    - [1.4.2复杂数组类型](#142复杂数组类型)
  - [1.5嵌套](#15嵌套)
    - [1.5.1简单嵌套](#151简单嵌套)
    - [1.5.2联合嵌套](#152联合嵌套)
    - [1.5.3交叉嵌套](#153交叉嵌套)
    - [1.5.4数组交叉](#154数组交叉)
    - [1.5.5循环嵌套](#155循环嵌套)
  - [1.6索引类型](#16索引类型)

## 接口

`common.ts`文件:

```ts
export interface AAA {
  other1: string;
}
export interface BBB {
  other10: string;
}

export enum Label {
  // 枚举
  LABEL_OPTIONAL = 1,
  LABEL_REQUIRED = 2,
  LABEL_REPEATED = 3,
}

export namespace Param {
  export namespace C {
    export namespace D {
      export namespace E {
        export namespace F {
          export interface GetBaseDetailResponse {
            id: string;
          }
        }
      }
    }
  }
}

export namespace Param_1 {
  export enum Label {
    // 枚举
    LABEL_OPTIONAL = 1,
    LABEL_REQUIRED = 2,
    LABEL_REPEATED = 3,
  }
  export interface A {
    name: string;
  }
}

```

### 1.1简单类型

```ts
interface Interface_1_1 {
  attr1: string;
  attr2: number;
  attr3?: boolean;
}
```

结果:

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

### 1.2联合类型

示例:

```ts
import { AAA, BBB } from './common';

interface Interface_8 {
  attr: AAA | BBB;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "other1": {
          "type": "string",
        },
      },
      "required": [
        "other1",
      ],
      "type": "object",
    },
    "BBB": {
      "additionalProperties": false,
      "properties": {
        "other10": {
          "type": "string",
        },
      },
      "required": [
        "other10",
      ],
      "type": "object",
    },
  },
  "properties": {
    "attr": {
      "anyOf": [
       {
          "$ref": "#/definitions/AAA",
        },
       {
          "$ref": "#/definitions/BBB",
        },
      ],
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

### 1.3交叉类型

```ts
import { AAA, BBB } from './common';

interface Interface_9 {
  attr: AAA & BBB;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "other1": {
          "type": "string",
        },
      },
      "required": [
        "other1",
      ],
      "type": "object",
    },
    "BBB": {
      "additionalProperties": false,
      "properties": {
        "other10": {
          "type": "string",
        },
      },
      "required": [
        "other10",
      ],
      "type": "object",
    },
  },
  "properties": {
    "attr": {
      "allOf": [
       {
          "$ref": "#/definitions/AAA",
        },
       {
          "$ref": "#/definitions/BBB",
        },
      ],
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

### 1.4数组类型

#### 1.4.1简单数组类型

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

#### 1.4.2复杂数组类型

```ts
interface Interface_5 {
  attr: Array<string | number>;
}

interface Interface_6 {
  attr: (string | number)[];
}
```

结果:

```json
{
  "additionalProperties": false,
  "properties":  {
    "attr":  {
      "items":  {
        "anyOf": [
           {
            "type": "string",
          },
           {
            "type": "number",
          },
        ],
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

### 1.5嵌套

#### 1.5.1简单嵌套

```ts
import { AAA } from './common';

interface Interface_7 {
  attr: AAA;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "other1": {
          "type": "string",
        },
      },
      "required": [
        "other1",
      ],
      "type": "object",
    },
  },
  "properties": {
    "attr": {
      "$ref": "#/definitions/AAA",
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

#### 1.5.2联合嵌套

```ts
import { AAA, BBB } from './common';

interface Interface_8 {
  attr: AAA | BBB;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "other1": {
          "type": "string",
        },
      },
      "required": [
        "other1",
      ],
      "type": "object",
    },
    "BBB": {
      "additionalProperties": false,
      "properties": {
        "other10": {
          "type": "string",
        },
      },
      "required": [
        "other10",
      ],
      "type": "object",
    },
  },
  "properties": {
    "attr": {
      "anyOf": [
       {
          "$ref": "#/definitions/AAA",
        },
       {
          "$ref": "#/definitions/BBB",
        },
      ],
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

#### 1.5.3交叉嵌套

```ts
import { AAA, BBB } from './common';

interface Interface_9 {
  attr: AAA & BBB;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "other1": {
          "type": "string",
        },
      },
      "required": [
        "other1",
      ],
      "type": "object",
    },
    "BBB": {
      "additionalProperties": false,
      "properties": {
        "other10": {
          "type": "string",
        },
      },
      "required": [
        "other10",
      ],
      "type": "object",
    },
  },
  "properties": {
    "attr": {
      "allOf": [
       {
          "$ref": "#/definitions/AAA",
        },
       {
          "$ref": "#/definitions/BBB",
        },
      ],
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

#### 1.5.4数组交叉

```ts
import { AAA, BBB } from './common';

interface Interface_10 {
  attr: (AAA & BBB)[];
}

interface Interface_11 {
  attr: Array<AAA & BBB>;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "other1": {
          "type": "string",
        },
      },
      "required": [
        "other1",
      ],
      "type": "object",
    },
    "BBB": {
      "additionalProperties": false,
      "properties": {
        "other10": {
          "type": "string",
        },
      },
      "required": [
        "other10",
      ],
      "type": "object",
    },
  },
  "properties": {
    "attr": {
      "items": {
        "allOf": [
         {
            "$ref": "#/definitions/AAA",
          },
         {
            "$ref": "#/definitions/BBB",
          },
        ],
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

#### 1.5.5循环嵌套

```ts
export interface Other_4 {
  name: string;
  age: number;
  children: Other_4;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "Other_4": {
      "additionalProperties": false,
      "properties": {
        "age": {
          "type": "number",
        },
        "children": {
          "$ref": "#/definitions/Other_4",
        },
        "name": {
          "type": "string",
        },
      },
      "required": [
        "name",
        "age",
        "children",
      ],
      "type": "object",
    },
  },
  "properties": {
    "age": {
      "type": "number",
    },
    "children": {
      "$ref": "#/definitions/Other_4",
    },
    "name": {
      "type": "string",
    },
  },
  "required": [
    "name",
    "age",
    "children",
  ],
  "type": "object",
}
```

### 1.6索引类型

```ts
import { AAA } from './common';

interface Interface_14_2 {
  [attr: string]: {
    name: string;
    other: AAA;
  };
}
```

结果:

```json
{
  "additionalProperties": {
    "properties": {
      "name": {
        "type": "string",
      },
      "other": {
        "$ref": "#/definitions/AAA",
      },
    },
    "required": [
      "name",
      "other",
    ],
    "type": "object",
  },
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "other1": {
          "type": "string",
        },
      },
      "required": [
        "other1",
      ],
      "type": "object",
    },
  },
  "type": "object",
}
```
