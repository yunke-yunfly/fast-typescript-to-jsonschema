- [Utility Types](toolFn.md#utility-types)
  - [1.1 Utility for Objects](toolFn.md#11-utility-for-objects)
    - [1.1.1 Omit](toolFn.md#111-omit)
      - [1.1.1.1 Basic Omit](toolFn.md#1111-basic-omit)
      - [1.1.1.2 Union Omit](toolFn.md#1112-union-omit)
      - [1.1.1.3 Import Omit](toolFn.md#1113-import-omit)
    - [1.1.2 Pick](toolFn.md#112-pick)
      - [1.1.2.1 Basic Pick](toolFn.md#1121-basic-pick)
      - [1.1.2.2 Import Pick](toolFn.md#1122-import-pick)
    - [1.1.3 Record](toolFn.md#112-record)
      - [1.1.2.1 Basic Record](toolFn.md#1121-basic-record)
      - [1.1.2.2 Import Record](toolFn.md#1122-import-record)

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
