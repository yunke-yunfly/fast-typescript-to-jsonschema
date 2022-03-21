- [Annotations](#annotations)
  - [1.1 Single-line annotations](#11-single-line-annotations)
  - [1.2 Single-line annotations with default value](#12-single-line-annotations-with-default-value)
  - [1.3 Multi-line annotations](#13-multi-line-annotations)
  - [1.4 Multi-line annotations with default value](#14-multi-line-annotations-with-default-value)
  - [1.5 Mixed annotations with default value](#15-mixed-annotations-with-default-value)

## Annotations

### 1.1 Single-line annotations

```ts
interface doc_1 {
  // single-line annotations
  name: string;
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "description": "single line annotations",
      "type": "string",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

### 1.2 Single-line annotations with default value

```ts
interface doc_3 {
  // @param {string} [name='zane'] name
  name: string;
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "default": "'zane'",
      "description": "name",
      "type": "string",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

### 1.3 Multi-line annotations

```ts
interface doc_2 {
  /**
   * multi-line annotations
   * @type {string}
   */
  name: string;
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "name": {
      "description": "multi-line annotations",
      "type": "string",
    },
  },
  "required": [
    "name",
  ],
  "type": "object",
}
```

### 1.4 Multi-line annotations with default value

```ts
interface doc_4 {
  /**
   * age
   * @param {number} [age=25]
   */
  age: number;
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "age": {
      "default": "25",
      "description": "age",
      "type": "number",
    },
  },
  "required": [
    "age",
  ],
  "type": "object",
}
```

### 1.5 Mixed annotations with default value

```ts
interface doc_5 {
  // @param {string} [name='zane'] name
  name: string;
  /**
   * age
   * @param {number} [age=25]
   */
  age: number;
}
```

result:

```json
{
  "additionalProperties": false,
  "properties": {
    "age": {
      "default": "25",
      "description": "age",
      "type": "number",
    },
    "name": {
      "default": "'zane'",
      "description": "name",
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



