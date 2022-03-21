import { Generic_type_1 } from "./generic_1";

// 简单泛型数组
interface Generic_1<T> {
  value1: T[];
}

interface Generic_2<T> {
  value1: string;
  value2: T;
}

type Generic_3 = Generic_2<string>

type Generic_4 = Generic_2<Generic_1<number>>

interface Generic_5 {
  value1: Generic_1<number>,
  value2: Generic_2<string>,
  value3: Generic_3,
  value4: Generic_4,
}

interface Generic_6<T = string> {
  value: T[];
}

interface Generic_7 {
  value7: Generic_6;
}

interface Generic_8<T> {
  value1: {
    value2: {
      value3: T,
    }
  }
}

type Generic_9 = Generic_8<string>

type Generic_10 = Generic_type_1<string>

interface Generic_11<T = Generic_8<string>> {
  value: T[];
}

type Generic_12 = Generic_11

type Generic_13 = Generic_11<string>