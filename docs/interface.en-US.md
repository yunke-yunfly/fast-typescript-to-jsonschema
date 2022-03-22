- [Interface](#Interface)
  - [1.1 Basic Types](#11-basic-types)
  - [1.2 Union Types](#12-union-types)
  - [1.3 Intersection Types](#13-intersection-types)
  - [1.4 Array Types](#14-array-types)
    - [1.4.1 Basic Array Types](#141-basic-array-types)
    - [1.4.2 Complex Array Types](#142-complex-array-types)
  - [1.5 Nesting](#15-nesting)
    - [1.5.1 Nested Basic Types](#151-nested-basic-types)
    - [1.5.2 Nested Union Types](#152-nested-union-types)
    - [1.5.3 Nested Intersection Types](#153-nested-intersection-types)
    - [1.5.4 Nested Intersection Array Types](#154-nested-intersection-array-types)
    - [1.5.5 Nested loop](#155-nested-loop)
  - [1.6 Index Types](#16-index-types)

## Interface

`common.ts`:

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

### 1.1 Basic Types

```ts
interface Interface_1_1 {
  attr1: string;
  attr2: number;
  attr3?: boolean;
}
```

result:

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

### 1.2 Union Types

Example:

```ts
import { AAA, BBB } from './common';

interface Interface_8 {
  attr: AAA | BBB;
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

### 1.3 Intersection Types

```ts
import { AAA, BBB } from './common';

interface Interface_9 {
  attr: AAA & BBB;
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

### 1.4 Array Types

#### 1.4.1 Basic Array Types

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

#### 1.4.2 Complex Array Types

```ts
interface Interface_5 {
  attr: Array<string | number>;
}

interface Interface_6 {
  attr: (string | number)[];
}
```

result:

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

### 1.5 Nesting

#### 1.5.1 Nested Basic Types

```ts
import { AAA } from './common';

interface Interface_7 {
  attr: AAA;
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

#### 1.5.2 Nested Union Types

```ts
import { AAA, BBB } from './common';

interface Interface_8 {
  attr: AAA | BBB;
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

#### 1.5.3 Nested Intersection Types

```ts
import { AAA, BBB } from './common';

interface Interface_9 {
  attr: AAA & BBB;
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

#### 1.5.4 Nested Intersection Array Types

```ts
import { AAA, BBB } from './common';

interface Interface_10 {
  attr: (AAA & BBB)[];
}

interface Interface_11 {
  attr: Array<AAA & BBB>;
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

#### 1.5.5 Nested loop

```ts
export interface Other_4 {
  name: string;
  age: number;
  children: Other_4;
}
```

result:

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

### 1.6 Index Types

```ts
import { AAA } from './common';

interface Interface_14_2 {
  [attr: string]: {
    name: string;
    other: AAA;
  };
}
```

result:

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
