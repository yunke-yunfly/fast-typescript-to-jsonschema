export interface AAAA {
  age: number;
}

export namespace Param {
  export namespace C {
    export namespace D {
      export namespace E {
        export namespace F {
          export interface GetBaseDetailResponse {
            id: string;
            name: string;
            age: number;
          }
        }
      }
    }
  }
}

interface A {
  name: string;
}

interface B {
  age: number;
}

interface C {
  aa: A;
}

export interface SomeInterface_ {
  other1: string;
  other2: string | number;
  other3: Array<string | number>;
  other4: A;
  other5: A & B;
  other6: { some: string; some1: B };
  other7: C;
  other8: { a: Param.C.D.E.F.GetBaseDetailResponse };
}

// export namespace P {
//   export enum Label {
//     // 枚举
//     LABEL_OPTIONAL = 1,
//     LABEL_REQUIRED = 2,
//     LABEL_REPEATED = 3,
//   }
//   export interface A {
//     name: string
//   }
// }

export enum Label {
  // 枚举
  LABEL_OPTIONAL = 1,
  LABEL_REQUIRED = 2,
  LABEL_REPEATED = 3,
}

interface Ddd {
  other3: string;
  other4: number;
  other5: Label;
}

interface Ccc {
  other1: Ddd;
  other2: string | number[];
}

interface Aaa {
  // 年龄
  age?: Label;
  // 姓名
  name: Ccc;
}

interface FFF {
  a: string;
}
interface GGG {
  b: string;
}

// type SomeInterface = number
interface FFF {
  name: string;
  age1?: number;
}

interface GGG {
  name: FFF;
  age: number;
}

export interface SomeInterface {
  [prop: string]: any;
}
