import { AAA, BBB, Param } from './common';
import { JSONSchema4TypeName } from 'json-schema'

interface Interface_0 {
  attr: any;
}

interface Interface_1 {
  attr: string;
}

interface Interface_1_1 {
  attr1: string;
  attr2: number;
  attr3?: boolean;
}

interface Interface_2 {
  attr: string | number | boolean;
}

interface Interface_3 {
  attr: string | number | boolean | 4 | 'yunke';
}

interface Interface_4 {
  attr: string[];
}

interface Interface_5 {
  attr: Array<string | number>;
}

interface Interface_6 {
  attr: (string | number)[];
}

interface Interface_7 {
  attr: AAA;
}

interface Interface_8 {
  attr: AAA | BBB;
}

interface Interface_9 {
  attr: AAA & BBB;
}

interface Interface_10 {
  attr: (AAA & BBB)[];
}

interface Interface_11 {
  attr: Array<AAA & BBB>;
}

interface Interface_12 {
  [attr: string]: any;
}

interface Interface_13 {
  [attr: string]: number;
}

interface Interface_14 {
  [attr: string]: string;
}

interface Interface_14_1 {
  [attr: string]: {
    name: string;
  };
}

interface Interface_14_2 {
  [attr: string]: {
    name: string;
    other: AAA;
  };
}

interface Interface_15 {
  [attr: string]: AAA;
}

interface Interface_16 {
  [attr: string]: AAA | BBB;
}

interface Interface_17 {
  [attr: string]: Array<AAA & BBB>;
}

interface Interface_21 {
  name: string;
  age: number;
  children: Interface_13;
}

export interface Interface_18 {
  other1: string;
  other2: string | number;
  other3: Array<string | number>;
  other4: AAA;
  other5: AAA & BBB;
  other6: { some: string; some1: BBB };
  other8: { a: Param.C.D.E.F.GetBaseDetailResponse };
}

// 继承
export interface Interface_19 extends AAA {
  other2: number;
}

export interface Interface_20 {
  attr1: Interface_19;
  attr2: AAA & BBB;
}

interface Interface_22 extends Interface_19 {
  other2: number;
}

export interface Interface_23 extends Interface_22 {
  other2: number;
  arr: Interface_20[]
}

interface Interface_24 { }

interface Interface_25 {
  value: JSONSchema4TypeName,
}