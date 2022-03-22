- [工具函数](#工具函数)
  - [1.1对象工具](#11对象工具)
    - [1.1.1Omit](#111omit)
      - [1.1.1.1简单](#1111简单)
      - [1.1.1.2联合](#1112联合)
      - [1.1.1.3引入](#1113引入)
    - [1.1.2Pick](#112pick)
      - [1.1.2.1简单](#1121简单)
      - [1.1.2.2引入](#1122引入)
      - [1.1.2.3联合](#1123联合)
    - [1.1.3Record](#113record)
      - [1.1.3.1简单](#1131简单)
      - [1.1.3.2引入](#1132引入)
    - [1.1.4Partial](#114partial)
      - [1.1.4.1简单](#1141简单)
      - [1.1.4.2引入](#1142引入)
      - [1.1.4.3联合](#1143联合)
    - [1.1.5Required](#115required)
      - [1.1.5.1简单](#1151简单)
      - [1.1.5.2引入](#1152引入)
      - [1.1.5.3联合](#1153联合)

## 工具函数

### 1.1对象工具

#### 1.1.1Omit

##### 1.1.1.1简单

```ts
type ToolFn_1 = Omit<{ a: number; b: string; c: boolean }, 'b'>;
```

结果:

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

##### 1.1.1.2联合

```ts
type ToolFn_2 = Omit<{ a: number; b: string; c: boolean }, 'b' | 'c'>;
```

结果:

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

##### 1.1.1.3引入

```ts
interface AAA {
  a: number;
  b: string;
  c: boolean;
}
type ToolFn_3 = Omit<AAA, 'b'>;
```

结果:

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

#### 1.1.2Pick

##### 1.1.2.1简单

```ts
type ToolFn_9 = Pick<{ a: number; b: string; c: boolean }, 'b'>;
```

结果:

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

##### 1.1.2.2引入

```ts
interface AAA {
  a: number;
  b: string;
  c: boolean;
}
type ToolFn_10 = Pick<AAA, 'b'>;
```

结果:

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

##### 1.1.2.3联合

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

#### 1.1.3Record

##### 1.1.3.1简单

```ts
type ToolFn_13 = Record<'home' | 'about', number>;
```

结果:

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

##### 1.1.3.2引入

```ts
type Page = 'home' | 'about' | 'contact' | string;
type ToolFn_15 = Record<Page, string>;
```

结果:

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

#### 1.1.4Partial

##### 1.1.4.1简单

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

##### 1.1.4.2引入

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

##### 1.1.4.3联合

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

#### 1.1.5Required

##### 1.1.5.1简单

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

##### 1.1.5.2引入

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

##### 1.1.5.3联合

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
