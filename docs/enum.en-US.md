- [Enums](#enums)
  - [1.1 Numeric Enums](#11-numeric-enums)
  - [1.2 String Enums](#12-string-enums)
  - [1.3 Computed Enums](#13-computed-enums)
  - [1.4 Complex Enums](#14-complex-enums)
    - [1.4.1 Basic Interface to Enums](#141-basic-interface-to-enums)
    - [1.4.2 Complex Interface to Enums](#142-complex-interface-to-enums)

## Enums

### 1.1 Numeric Enums

```ts
enum Enum_3 {
  Up = 1,
  Down,
  Left,
  Right,
}
```

result:

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

### 1.2 String Enums

```ts
enum Enum_1 {
  A = 'A',
  B = 'B',
  C = 'C',
}
```

result:

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

### 1.3 Computed Enums

```ts
enum Enum_6 {
  A = 1,
  B = A * 2,
  C = A * B + A,
  D = 1 << 2,
}
```

result:

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

### 1.4 Complex Enums

#### 1.4.1 Basic Interface to Enums

```ts
interface Interface_To_Enum_2 {
  attr: '1' | '2' | '3';
}
```

result:

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

#### 1.4.2 Complex Interface to Enums

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

result:

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
