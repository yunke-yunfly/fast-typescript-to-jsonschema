export enum Role {
  Maintainer = 'Maintainer',
  Developer = 'Developer',
}

// import { AAAA, Param } from "./types_1";

// interface BBB {
//     some: string;
// }

// type ToolFn_1 = Omit<Param.C.D.E.F.GetBaseDetailResponse, 'name'>;
// type ToolFn_2 = Pick<Param.C.D.E.F.GetBaseDetailResponse, 'name'>
// type ToolFn_3 = Record<"home" | "about" | "contact" | number, Param.C.D.E.F.GetBaseDetailResponse>
// interface AAA extends ToolFn_3 {

// }

// type Page = 'home' | 'about' | 'contact' | string;
// type RouteMappingResponse = Record<string, Page>;
// interface RouteMappingResponse {
//   /** 路由映射表 */
//   'list': Record<string, string>;
// }

// interface AAA {
//   a: number;
//   b: string;
//   c: boolean;
// }

// type ToolFn_1 = Omit<{ a: number; b: string; c: boolean }, 'b'>;

// type ToolFn_2 = Omit<{ a: number; b: string; c: boolean }, 'b' | 'c'>;

// type ToolFn_3 = Omit<AAA, 'b'>;

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

// type ToolFn_9 = Pick<{ a: number; b: string; c: boolean }, 'b'>;

// type ToolFn_10 = Pick<AAA, 'b'>;

// interface ToolFn_11 {
//   name: Pick<AAA, "b" | "c">
// }

// interface ToolFn_12 {
//   name: Array<Pick<AAA, "b" | "c"> | AAA> | Pick<AAA, "b">
// }

// type Page = 'home' | 'about' | 'contact' | string;

// type ToolFn_13 = Record<'home' | 'about' | 'contact' | string, number>;

// type ToolFn_14 = Record<'home' | 'about', string>;

// type ToolFn_15 = Record<Page, string>;

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

// interface AAA {
//   name: string
// }
// interface PageInfo {
//   title: string;
//   some: AAA
// }

// type Page = "home" | "about" | string;
// // type TreeItem = Record<Page, PageInfo>

// interface TreeItem {
//   name: Record<"home" | "about" | "contact" | number, PageInfo>
// }

// type TreeItem = Omit<{ a: number; b: string; }, "b">;
// interface TreeItem {
//   name: Omit<{ a: number; b: string; }, "b">
// }

// interface BBB {
//   incentive_scheme_id: string
// }

// interface AAA {
//   a: number; b: string; c: BBB
// }

// type TreeItem = Array<{ a: number; b: string; c: boolean }> | string;

// export interface TreeItem {
//   params: { name: Array<Omit<AAA, "b" | 'c'>> | string}
// }

// export interface TreeItem {
//   params: Omit<{ a: number; b: string; c: boolean }, "b" | "c">
// }

// export interface TreeItem {
//   params: Array<Omit<AAA, "a"> & string>
// }

// interface AAA {
//   a: number; b: string; c: boolean
// }

// interface GetAccountListRequest {
//   'keyword_type'?: number;
//   'keyword'?: string;
//   'incentive_scheme_id': string[];
//   'begin_time'?: string;
//   'end_time'?: string;
//   'status'?: number;
// }

// type TreeItem = Omit<GetAccountListRequest, 'incentive_scheme_id'>
