- [Namespaces](#namespaces)
  - [1.1 Basic Namespaces](#11-basic-namespaces)
  - [1.2 Complex Namespaces](#12-complex-namespaces)

## Namespaces

### 1.1 Basic Namespaces

```ts
export namespace Param {
  export interface A {
    name: string;
  }
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "type": "string",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

### 1.2 Complex Namespaces

```ts
import { Param, Param_1 } from './common';
import * as Type from './common';

export interface Namespace_4 {
  other1: Param.C.D.E.F.GetBaseDetailResponse;
  other2: Param_1.A;
  other3: Param_1.Label;
}
```

result:

```json
{
  "additionalProperties": false,
  "definitions": {
    "Param.C.D.E.F.GetBaseDetailResponse": {
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string",
        },
      },
      "required": [
        "id",
      ],
      "type": "object",
    },
    "Param_1.A": {
      "additionalProperties": false,
      "properties": {
        "name": {
          "type": "string",
        },
      },
      "required": [
        "name",
      ],
      "type": "object",
    },
    "Param_1.Label": {
      "enum": [
        1,
        2,
        3,
      ],
      "type": "number",
    },
  },
  "properties": {
    "other1": {
      "$ref": "#/definitions/Param.C.D.E.F.GetBaseDetailResponse",
    },
    "other2": {
      "$ref": "#/definitions/Param_1.A",
    },
    "other3": {
      "$ref": "#/definitions/Param_1.Label",
    },
  },
  "required": [
    "other1",
    "other2",
    "other3",
  ],
  "type": "object",
}
```
