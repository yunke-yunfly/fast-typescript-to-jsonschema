import { AAA } from './common';

enum Enum_0 {
  A,
  B,
}

enum Enum_1 {
  A = 'A',
  B = 'B',
  C = 'C',
}

enum Enum_2 {
  A = 1,
  B,
  C,
}

enum Enum_3 {
  Up = 1,
  Down,
  Left,
  Right,
}

enum Enum_4 {
  No = 0,
  Yes = 1,
}

enum Enum_5 {
  No = 0,
  Yes = 'YES',
}

enum Enum_6 {
  A = 1,
  B = A * 2,
  C = A * B + A,
  D = 1 << 2,
}

enum Enum_7 {

}

interface Interface_To_Enum_1 {
  attr: '1';
}

interface Interface_To_Enum_2 {
  attr: '1' | '2' | '3';
}

interface A {
  name: string;
  attr: B;
}
interface B {
  name1: string;
}
enum Label {
  LABEL_OPTIONAL = 1,
  LABEL_REQUIRED = 2,
  LABEL_REPEATED = 3,
}

interface Interface_To_Enum_3 {
  attr: '1' | '2' | '3' | true | 1 | Label | Array<A | B>;
}

export namespace NameSpaceParent {
  export namespace NameSpacechild {
    export namespace NameSpacechildren {
      export interface A {
        name: string;
        attr: NameSpaceParent.NameSpacechild.NameSpacechildren.B;
      }
      export interface B {
        name1: string;
      }
      export enum Label {
        LABEL_OPTIONAL = 1,
        LABEL_REQUIRED = 2,
        LABEL_REPEATED = 3,
      }
    }
  }
}
interface Interface_To_Enum_4 {
  attr:
  | '1'
  | '2'
  | '3'
  | true
  | 1
  | NameSpaceParent.NameSpacechild.NameSpacechildren.Label
  | Array<
    | NameSpaceParent.NameSpacechild.NameSpacechildren.A
    | NameSpaceParent.NameSpacechild.NameSpacechildren.B
  >;
}
