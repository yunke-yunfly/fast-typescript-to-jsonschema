- [模块](#模块)
  - [1.1简单导出](#11简单导出)
  - [1.2导出重命名](#12导出重命名)

## 模块

`common.ts`文件:

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

`module_types_1.ts`文件
```ts
export interface User {
  name: string;
}

```

`module_types_2.ts`文件
```ts
import { User as _User } from './module_types_1';
export interface UserGroup {
  user: _User;
}

```

### 1.1简单导出

```ts
import { AAA } from './common';

interface Interface_7 {
  attr: AAA;
}
```

结果:

```json
{
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

### 1.2导出重命名

```ts
import { AAA as _AAA } from './common';
import { UserGroup as _UserGroup } from './module_types_2';
import { User as _User } from './module_types_1';

interface Module_1 {
  attr1: _AAA;
  attr2: _UserGroup;
  attr3: _User;
}

```

结果:

```json
{
  "additionalProperties": false,
  "definitions": {
    "_AAA": {
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
    "_User": {
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
    "_UserGroup": {
      "additionalProperties": false,
      "properties": {
        "user": {
          "$ref": "#/definitions/_User",
        },
      },
      "required": [
        "user",
      ],
      "type": "object",
    },
  },
  "properties": {
    "attr1": {
      "$ref": "#/definitions/_AAA",
    },
    "attr2": {
      "$ref": "#/definitions/_UserGroup",
    },
    "attr3": {
      "$ref": "#/definitions/_User",
    },
  },
  "required": [
    "attr1",
    "attr2",
    "attr3",
  ],
  "type": "object",
}
```

