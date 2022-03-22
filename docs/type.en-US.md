- [Type](type.md#type)
  - [1.1 Basic Types](type.md#11-basic-types)
  - [1.2 Complex Types](type.md#12-complex-types)
    - [1.2.1 Union Types](type.md#121-union-types)
    - [1.2.2 Union Array Types](type.md#122-union-array-types)
    - [1.2.2 Import Enums](type.md#122-import-enums)

## Type

### 1.1 Basic Types

```ts
type Type_1 = number;
```

result:

```json
{
  "type": "number",
}
```

### 1.2 Complex Types

#### 1.2.1 Union Types

```ts
type Type_4 = string | number | 5 | true;
```

result:

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

#### 1.2.2 Union Array Types

```ts
import { AAA } from './common';

type Type_1 = number;
type Type_8 = (AAA | Type_1)[];
```

result:

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

#### 1.2.3 Import Enums

```ts
import { Label } from './common';

type Type_11 = { name: Label };
```

result:

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

