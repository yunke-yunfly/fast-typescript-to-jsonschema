- [枚举](#枚举)
  - [1.1数字枚举](#11数字枚举)
  - [1.2字符串枚举](#12字符串枚举)
  - [1.3计算枚举](#13计算枚举)
  - [1.4复杂枚举](#14复杂枚举)
    - [1.4.1简单接口转枚举](#141简单接口转枚举)
    - [1.4.2复杂接口转枚举](#142复杂接口转枚举)

## 枚举

### 1.1数字枚举

```ts
enum Enum_3 {
  Up = 1,
  Down,
  Left,
  Right,
}
```

结果:

```json
{
  "enum": [
    1,
    2,
    3,
    4,
  ],
  "type": "number",
}
```

### 1.2字符串枚举

```ts
enum Enum_1 {
  A = 'A',
  B = 'B',
  C = 'C',
}
```

结果:

```json
{
  "enum": [
    "A",
    "B",
    "C",
  ],
  "type": "string",
}
```

### 1.3计算枚举

```ts
enum Enum_6 {
  A = 1,
  B = A * 2,
  C = A * B + A,
  D = 1 << 2,
}
```

结果:

```json
{
  "enum": [
    1,
    2,
    3,
    4,
  ],
  "type": "number",
}
```

### 1.4复杂枚举

#### 1.4.1简单接口转枚举

```ts
interface Interface_To_Enum_2 {
  attr: '1' | '2' | '3';
}
```

结果:

```json
{
  "additionalProperties": false,
  "properties": {
    "attr": {
      "enum": [
        "1",
        "2",
        "3",
      ],
      "type": "string",
    },
  },
  "required": [
    "attr",
  ],
  "type": "object",
}
```

#### 1.4.2复杂接口转枚举

```ts
export namespace NameSpaceParent {
  export namespace NameSpaceChild {
    export namespace NameSpaceChildren {
      export interface A {
        name: string;
        attr: NameSpaceParent.NameSpaceChild.NameSpaceChildren.B;
      }
      export interface B {
        name1: string;
      }
      export enum Label {
        LABEL_OPTIONAL = 1,
        LABEL_REQUIRED = 2,
        LABEL_REPEATED = 3,
      }
    }
  }
}

interface Interface_To_Enum_4 {
  attr:
    | '1'
    | '2'
    | '3'
    | true
    | 1
    | NameSpaceParent.NameSpaceChild.NameSpaceChildren.Label
    | Array<
        | NameSpaceParent.NameSpaceChild.NameSpaceChildren.A
        | NameSpaceParent.NameSpaceChild.NameSpaceChildren.B
      >;
}
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "NameSpaceParent.NameSpaceChild.NameSpaceChildren.A": {
      "additionalProperties": false,
      "properties": {
        "attr": {
          "$ref": "#/definitions/NameSpaceParent.NameSpaceChild.NameSpaceChildren.B",
        },
        "name": {
          "type": "string",
        },
      },
      "required": [
        "name",
        "attr",
      ],
      "type": "object",
    },
    "NameSpaceParent.NameSpaceChild.NameSpaceChildren.B": {
      "additionalProperties": false,
      "properties": {
        "name1": {
          "type": "string",
        },
      },
      "required": [
        "name1",
      ],
      "type": "object",
    },
    "NameSpaceParent.NameSpaceChild.NameSpaceChildren.Label": {
      "enum": [
        1,
        2,
        3,
      ],
      "type": "number",
    },
  },
  "properties": {
    "attr": {
      "anyOf": [
       {
          "$ref": "#/definitions/NameSpaceParent.NameSpaceChild.NameSpaceChildren.Label",
        },
       {
          "items": {
            "anyOf": [
             {
                "$ref": "#/definitions/NameSpaceParent.NameSpaceChild.NameSpaceChildren.A",
              },
             {
                "$ref": "#/definitions/NameSpaceParent.NameSpaceChild.NameSpaceChildren.B",
              },
            ],
          },
          "type": "array",
        },
       {
          "enum": [
            "1",
            "2",
            "3",
            true,
            1,
          ],
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
