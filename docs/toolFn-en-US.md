- [Utility Types](#utility-types)
  - [1.1 Utility for Objects](#11-utility-for-objects)
    - [1.1.1 Omit](#111-omit)
      - [1.1.1.1 Basic Omit](#1111-basic-omit)
      - [1.1.1.2 Union Omit](#1112-union-omit)
      - [1.1.1.3 Import Omit](#1113-import-omit)
    - [1.1.2 Pick](#112-pick)
      - [1.1.2.1 Basic Pick](#1121-basic-pick)
      - [1.1.2.2 Import Pick](#1122-import-pick)
      - [1.1.2.3 Union Pick](#1123-union-pick)
    - [1.1.3 Record](#113-record)
      - [1.1.3.1 Basic Record](#1131-basic-record)
      - [1.1.3.2 Import Record](#1132-import-record)
    - [1.1.4 Partial](#114-partial)
      - [1.1.4.1 Basic Partial](#1141-basic-partial)
      - [1.1.4.2 Import Partial](#1142-import-partial)
      - [1.1.4.3 Union Partial](#1143-union-partial)
    - [1.1.5 Required](#115-required)
      - [1.1.5.1 Basic Required](#1151-basic-required)
      - [1.1.5.2 Import Required](#1152-import-required)
      - [1.1.5.3 Union Required](#1153-union-required)

## Utility Types

### 1.1 Utility for Objects

#### 1.1.1 Omit

##### 1.1.1.1 Basic Omit

```ts
type ToolFn_1 = Omit<{ a: number; b: string; c: boolean }, 'b'>;
```

result:

```json
{
  "properties": {
    "a": {
      "type": "number",
    },
    "c": {
      "type": "boolean",
    },
  },
  "required": [
    "a",
    "c",
  ],
  "type": "object",
}
```

##### 1.1.1.2 Union Omit

```ts
type ToolFn_2 = Omit<{ a: number; b: string; c: boolean }, 'b' | 'c'>;
```

result:

```json
{
  "properties": {
    "a": {
      "type": "number",
    },
  },
  "required": [
    "a",
  ],
  "type": "object",
}
```

##### 1.1.1.3 Import Omit

```ts
interface AAA {
  a: number;
  b: string;
  c: boolean;
}
type ToolFn_3 = Omit<AAA, 'b'>;
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "a": {
      "type": "number",
    },
    "c": {
      "type": "boolean",
    },
  },
  "required": [
    "a",
    "c",
  ],
  "type": "object",
}
```

#### 1.1.2 Pick

##### 1.1.2.1 Basic Pick

```ts
type ToolFn_9 = Pick<{ a: number; b: string; c: boolean }, 'b'>;
```

result:

```json
{
  "properties": {
    "b": {
      "type": "string",
    },
  },
  "required": [
    "b",
  ],
  "type": "object",
}
```

##### 1.1.2.2 Import Pick

```ts
interface AAA {
  a: number;
  b: string;
  c: boolean;
}
type ToolFn_10 = Pick<AAA, 'b'>;
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "b": {
      "type": "string",
    },
  },
  "required": [
    "b",
  ],
  "type": "object",
}
```

##### 1.1.2.3 Union Pick

```ts
type Filter = 'a' | 'b';
type ToolFn_16 = Pick<AAA, Filter>;
```

结果:

```json
{
  "additionalProperties": false,
  "properties": {
    "a": {
      "type": "number",
    },
    "b": {
      "type": "string",
    },
  },
  "required": [
    "a",
    "b",
  ],
  "type": "object",
}
```


#### 1.1.3 Record

##### 1.1.3.1 Basic Record

```ts
type ToolFn_13 = Record<'home' | 'about', number>;
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "about": {
      "type": "number",
    },
    "home": {
      "type": "number",
    },
  },
  "required": [
    "home",
    "about",
  ],
  "type": "object",
}
```

##### 1.1.3.2 Import Record

```ts
type Page = 'home' | 'about' | 'contact' | string;
type ToolFn_15 = Record<Page, string>;
```

result:

```json
{
  "additionalProperties": {
    "type": "string",
  },
  "properties": {
    "about": {
      "type": "string",
    },
    "contact": {
      "type": "string",
    },
    "home": {
      "type": "string",
    },
  },
  "required": [
    "home",
    "about",
    "contact",
  ],
  "type": "object",
}
```

#### 1.1.4 Partial

##### 1.1.4.1 Basic Partial

```ts
type ToolFn_20 = Partial<{ a: string, b: number }>;
```

结果:

```json
{
  "properties": {
    "a": {
      "type": "string",
    },
    "b": {
      "$ref": "number",
    },
  },
  "type": "object",
}
```

##### 1.1.4.2 Import Partial

```ts
interface AAA {
  a: number;
  b: string;
  c: boolean;
}
interface BBB {
  a: number;
  b?: string;
  c: AAA,
}
type ToolFn_19 = Partial<BBB>;
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "AAA": {
      "additionalProperties": false,
      "properties": {
        "a": {
          "type": "number",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "type": "boolean",
        },
      },
      "required": [
        "a",
        "b",
        "c",
      ],
      "type": "object",
    },
  },
  "properties": {
    "a": {
      "type": "number",
    },
    "b": {
      "type": "string",
    },
    "c": {
      "$ref": "#/definitions/AAA",
    },
  },
  "type": "object",
}
```

##### 1.1.4.3 Union Partial

```ts
interface AAA {
  a: number;
  b: string;
  c: boolean;
}
interface BBB {
  a: number;
  b?: string;
  c: AAA,
}
type ToolFn_24 = Partial<BBB | AAA>;
```

结果:

```json
{
  "anyOf": [
   {
      "additionalProperties": false,
      "definitions": {
        "AAA": {
          "additionalProperties": false,
          "properties": {
            "a": {
              "type": "number",
            },
            "b": {
              "type": "string",
            },
            "c": {
              "type": "boolean",
            },
          },
          "required": [
            "a",
            "b",
            "c",
          ],
          "type": "object",
        },
      },
      "properties": {
        "a": {
          "type": "number",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "$ref": "#/definitions/AAA",
        },
      },
      "type": "object",
    },
   {
      "additionalProperties": false,
      "properties": {
        "a": {
          "type": "number",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "type": "boolean",
        },
      },
      "type": "object",
    },
  ],
}
```

#### 1.1.5 Required

##### 1.1.5.1 Basic Required

```ts
type ToolFn_23 = Required<{ a?: string, b?: number }>;
```

结果:

```json
{
  "properties": {
    "a": {
      "type": "string",
    },
    "b": {
      "$ref": "number",
    },
  },
  "required": [
    "a",
    "b",
  ],
  "type": "object",
}
```

##### 1.1.5.2 Import Required

```ts
interface CCC {
  a?: number;
  b?: string;
  c?: boolean;
}

interface DDD {
  a: number;
  b?: string;
  c: CCC,
}
type ToolFn_22 = Required<DDD>;
```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "CCC": {
      "additionalProperties": false,
      "properties": {
        "a": {
          "type": "number",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "type": "boolean",
        },
      },
      "type": "object",
    },
  },
  "properties": {
    "a": {
      "type": "number",
    },
    "b": {
      "type": "string",
    },
    "c": {
      "$ref": "#/definitions/CCC",
    },
  },
  "required": [
    "a",
    "b",
    "c",
  ],
  "type": "object",
}
```

##### 1.1.5.3 Union Required

```ts
interface CCC {
  a?: number;
  b?: string;
  c?: boolean;
}

interface DDD {
  a: number;
  b?: string;
  c: CCC,
}
type ToolFn_25 = Required<DDD | CCC>;
```

结果:

```json
{
  "anyOf": [
   {
      "additionalProperties": false,
      "definitions": {
        "CCC": {
          "additionalProperties": false,
          "properties": {
            "a": {
              "type": "number",
            },
            "b": {
              "type": "string",
            },
            "c": {
              "type": "boolean",
            },
          },
          "type": "object",
        },
      },
      "properties": {
        "a": {
          "type": "number",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "$ref": "#/definitions/CCC",
        },
      },
      "required": [
        "a",
        "b",
        "c",
      ],
      "type": "object",
    },
   {
      "additionalProperties": false,
      "properties": {
        "a": {
          "type": "number",
        },
        "b": {
          "type": "string",
        },
        "c": {
          "type": "boolean",
        },
      },
      "required": [
        "a",
        "b",
        "c",
      ],
      "type": "object",
    },
  ],
}
```