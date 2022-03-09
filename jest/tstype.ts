import { AAA, Label } from './common';

// @param {number} [Type_1=1] 单行备注
type Type_1 = number;

/**
 * 多行备注
 * @param {string} [Type_2='zane']
 */
type Type_2 = string;

type Type_3 = string | number;

type Type_4 = string | number | 5 | true;

type Type_5 = AAA;

type Type_6 = AAA | number;

type Type_7 = AAA | Type_1;

type Type_8 = (AAA | Type_1)[];

type Type_9 = Omit<{ a: number; b: string; c: boolean }, 'b'>;

type Type_10 = Label;

type Type_11 = { name: Label };

type Type_12 = AAA[];

type Type_13 = {};
