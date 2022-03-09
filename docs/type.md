
- [type类型](#type类型)
  - [1.1基本类型](#11基本类型)
  - [1.2复杂](#12复杂)
    - [1.2.1联合类型](#121联合类型)
    - [1.2.2联合数组](#122联合数组)
    - [1.2.2引用枚举](#122引用枚举)

## type类型

### 1.1基本类型

```ts
type Type_1 = number;
```

结果:

```json
{
  "type": "number",
}
```

### 1.2复杂

#### 1.2.1联合类型

```ts
type Type_4 = string | number | 5 | true;
```

结果:

```json
{
  "anyOf": [
   {
      "type": "string",
    },
   {
      "type": "number",
    },
   {
      "enum": [
        5,
        true,
      ],
    },
  ],
}
```

#### 1.2.2联合数组

```ts
import { AAA } from './common';

type Type_1 = number;
type Type_8 = (AAA | Type_1)[];
```

结果:

```json
{
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
    "Type_1":  {
      "type": "number",
    },
  },
  "items":  {
    "anyOf": [
       {
        "$ref": "#/definitions/AAA",
      },
       {
        "$ref": "#/definitions/Type_1",
      },
    ],
  },
  "type": "array",
}
```

#### 1.2.2引用枚举

```ts
import { Label } from './common';

type Type_11 = { name: Label };
```

结果:

```json
{
  "definitions": {
    "Label": {
      "enum": [
        1,
        2,
        3,
      ],
      "type": "number",
    },
  },
  "properties": {
    "name": {
      "$ref": "#/definitions/Label",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

