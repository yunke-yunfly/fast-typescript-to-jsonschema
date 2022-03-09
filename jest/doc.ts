interface doc_1 {
  // 支持单行注释
  name: string;
}

interface doc_2 {
  /**
   * 支持多行注释
   *
   * @type {string}
   * @memberof doc_1
   */
  name: string;
}

// 单行注释默认值
interface doc_3 {
  // @param {string} [name='zane'] 姓名
  name: string;
}

// 多行注释默认值
interface doc_4 {
  /**
   * 年龄
   * @param {number} [age=25]
   */
  age: number;
}

// 单多行注释默认值
interface doc_5 {
  // @param {string} [name='zane'] 姓名
  name: string;
  /**
   * 年龄
   * @param {number} [age=25]
   */
  age: number;
}
