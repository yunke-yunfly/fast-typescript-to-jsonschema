- [Generics](#generics)
  - [1.1 Basic Generics](#11-basic-generics)
  - [1.2 Complex Generics](#12-complex-generics)

## Generics

### 1.1 Basic Generics

```ts
interface Generic_2<T> {
  value1: string;
  value2: T;
}

type Generic_3 = Generic_2<string>
```

result:

```json
{
  "additionalProperties": false,
  "definitions": {},
  "properties": {
    "value1": {
      "type": "string",
    },
    "value2": {
      "type": "string",
    },
  },
  "required": [
    "value1",
    "value2",
  ],
  "type": "object",
}
```

### 1.2 Complex Generics

```ts
interface Generic_1<T> {
  value1: T;
}

interface Generic_2<T> {
  value1: string;
  value2: T;
}

type Generic_3 = Generic_2<string>

type Generic_4 = Generic_2<Generic_1<number>>

interface Generic_5 {
  value1: Generic_1<number>,
  value2: Generic_2<string>,
  value3: Generic_3,
  value4: Generic_4,
}
```

result:

```json
{
  "additionalProperties": false,
  "definitions": {
    "Generic_1<number>": {
      "additionalProperties": false,
      "properties": {
        "value1": {
          "type": "number",
        },
      },
      "required": [
        "value1",
      ],
      "type": "object",
    },
    "Generic_2<Generic_1<number>>": {
      "additionalProperties": false,
      "properties": {
        "value1": {
          "type": "string",
        },
        "value2": {
          "$ref": "#/definitions/Generic_1<number>",
        },
      },
      "required": [
        "value1",
        "value2",
      ],
      "type": "object",
    },
    "Generic_2<string>": {
      "additionalProperties": false,
      "properties": {
        "value1": {
          "type": "string",
        },
        "value2": {
          "type": "string",
        },
      },
      "required": [
        "value1",
        "value2",
      ],
      "type": "object",
    },
  },
  "properties": {
    "value1": {
      "$ref": "#/definitions/Generic_1<number>",
    },
    "value2": {
      "$ref": "#/definitions/Generic_2<string>",
    },
    "value3": {
      "$ref": "#/definitions/Generic_2<string>",
    },
    "value4": {
      "$ref": "#/definitions/Generic_2<Generic_1<number>>",
    },
  },
  "required": [
    "value1",
    "value2",
    "value3",
    "value4",
  ],
  "type": "object",
}
```
