import { AAA, BBB } from './common';
import { BodyPar } from './TestController';

interface Other_1 {
  name: string;
}

interface Other_2 {
  name: AAA;
}

interface Other_3 {
  name: BBB;
}

export namespace Param {
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

// 循环嵌套
export interface Other_4 {
  name: string;
  age: number;
  children: Other_4;
}

// 获得ts代码中导出的类型
export interface Other_5 {
  name: BodyPar;
}

export interface Other_6 {
  value: Promise<void>
}