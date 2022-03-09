- [注释](#注释)
  - [1.1单行注释](#11单行注释)
  - [1.2单行注释默认值](#12单行注释默认值)
  - [1.3多行注释](#13多行注释)
  - [1.4多行注释默认值](#14多行注释默认值)
  - [8.5单行多行注释默认值](#85单行多行注释默认值)

## 注释

### 1.1单行注释

```ts
interface doc_1 {
  // 支持单行注释
  name: string;
}
```

结果:

```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "description": "支持单行注释",
      "type": "string",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

### 1.2单行注释默认值

```ts
interface doc_3 {
  // @param {string} [name='zane'] 姓名
  name: string;
}
```

结果:

```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "default": "'zane'",
      "description": "姓名",
      "type": "string",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

### 1.3多行注释

```ts
interface doc_2 {
  /**
   * 支持多行注释
   *
   * @type {string}
   */
  name: string;
}
```

结果:

```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "description": "支持多行注释",
      "type": "string",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

### 1.4多行注释默认值

```ts
interface doc_4 {
  /**
   * 年龄
   * @param {number} [age=25]
   */
  age: number;
}
```

结果:

```json
{
  "additionalProperties": false,
  "properties": {
    "age": {
      "default": "25",
      "description": "年龄",
      "type": "number",
    },
  },
  "required": [
    "age",
  ],
  "type": "object",
}
```

### 8.5单行多行注释默认值

```ts
interface doc_5 {
  // @param {string} [name='zane'] 姓名
  name: string;
  /**
   * 年龄
   * @param {number} [age=25]
   */
  age: number;
}
```

结果:

```json
{
  "additionalProperties": false,
  "properties": {
    "age": {
      "default": "25",
      "description": "年龄",
      "type": "number",
    },
    "name": {
      "default": "'zane'",
      "description": "姓名",
      "type": "string",
    },
  },
  "required": [
    "name",
    "age",
  ],
  "type": "object",
}
```



