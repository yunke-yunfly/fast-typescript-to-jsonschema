- [Extending Types](#extending-types)
  - [1.1 Basic Extending Types](#11-basic-extending-types)
  - [1.2 Multiple Extending Types](#12-multiple-extending-types)
  
## Extending Types

### 1.1 Basic Extending Types

```ts
import { AAA } from './common';

export interface Interface_19 extends AAA {
  other2: number;
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "other1": {
      "type": "string",
    },
    "other2": {
      "type": "number",
    },
  },
  "required": [
    "other2",
    "other1",
  ],
  "type": "object",
}
```

### 1.2 Multiple Extending Types

```ts
import { AAA, BBB } from './common';

export interface Interface_19 extends AAA {
  other2: number;
}

export interface Interface_20 {
  attr1: Interface_19;
  attr2: AAA & BBB;
}

interface Interface_22 extends Interface_19 {
  other2: number;
}

export interface Interface_23 extends Interface_22 {
  other2: number;
  arr: Interface_20[]
}
```

result:

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
    "Interface_19": {
      "additionalProperties": false,
      "properties": {
        "other2": {
          "type": "number",
        },
      },
      "required": [
        "other2",
      ],
      "type": "object",
    },
    "Interface_20": {
      "additionalProperties": false,
      "properties": {
        "attr1": {
          "$ref": "#/definitions/Interface_19",
        },
        "attr2": {
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
        "attr1",
        "attr2",
      ],
      "type": "object",
    },
  },
  "properties": {
    "arr": {
      "items": {
        "$ref": "#/definitions/Interface_20",
      },
      "type": "array",
    },
    "other1": {
      "type": "string",
    },
    "other2": {
      "type": "number",
    },
  },
  "required": [
    "other2",
    "arr",
    "other1",
  ],
  "type": "object",
}
```

