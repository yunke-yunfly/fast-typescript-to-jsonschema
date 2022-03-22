interface AAA {
  a: number;
  b: string;
  c: boolean;
}

interface BBB {
  a: number;
  b?: string;
  c: AAA,
}

type ToolFn_1 = Omit<{ a: number; b: string; c: boolean }, 'b'>;

type ToolFn_2 = Omit<{ a: number; b: string; c: boolean }, 'b' | 'c'>;

type ToolFn_3 = Omit<AAA, 'b'>;

// interface ToolFn_4 {
//   name: Omit<{ a: number; b: string; c: boolean; }, "b">
// }

// interface ToolFn_5 {
//   name: Omit<{ a: number; b: string; c: boolean; }, "b" | "c">
// }

// interface ToolFn_6 {
//   name: Omit<AAA, "b" | "c">
// }

// interface ToolFn_7 {
//   name: Omit<AAA, "b" | "c"> | AAA
// }

// interface ToolFn_8 {
//   name: Array<Omit<AAA, "b" | "c"> | AAA> | Omit<AAA, "b">
// }

type ToolFn_9 = Pick<{ a: number; b: string; c: boolean }, 'b'>;

type ToolFn_10 = Pick<AAA, 'b'>;

// interface ToolFn_11 {
//   name: Pick<AAA, "b" | "c">
// }

// interface ToolFn_12 {
//   name: Array<Pick<AAA, "b" | "c"> | AAA> | Pick<AAA, "b">
// }

type Page = 'home' | 'about' | 'contact' | string;

type ToolFn_13 = Record<'home' | 'about', number>;

type ToolFn_14 = Record<'home' | 'about', string>;

type ToolFn_15 = Record<Page, string>;

// interface ToolFn_16 {
//   name: Record<"home" | "about" | "contact" | number, string>
// }

// interface ToolFn_17 {
//   name: Record<Page | number, string>
// }

// interface PageInfo {
//   title: string;
//   some: AAA
// }

// interface ToolFn_18 {
//   name: Record<Page, PageInfo>
// }

type Filter = 'a' | 'b';
type ToolFn_16 = Pick<AAA, Filter>;

type ToolFn_17 = Omit<AAA, Filter>;


type ToolFn_18 = Partial<AAA>;

type ToolFn_19 = Partial<BBB>;

type ToolFn_20 = Partial<{ a: string, b: BBB }>;
