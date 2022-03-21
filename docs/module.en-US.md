- [Modules](#modules)
  - [1.1 Basic Modules](#11-basic-modules)
  - [1.2 Named Export Modules](#12-named-export-modules)

## Modules

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

`module_types_1.ts`

```ts
export interface User {
  name: string;
}

```

`module_types_2.ts`

```ts
import { User as _User } from './module_types_1';
export interface UserGroup {
  user: _User;
}

```

### 1.1 Basic Modules

```ts
import { AAA } from './common';

interface Interface_7 {
  attr: AAA;
}
```

result:

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

### 1.2 Named Export Modules

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

result:

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

