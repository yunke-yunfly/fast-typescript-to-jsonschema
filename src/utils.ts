import * as fs from 'fs';

import type { Node } from '@babel/core';
import { parse } from '@babel/parser';

// types
import type { AnyOption } from './types';

type AstType = Node | Node[] | null | undefined;

const parseConfig: AnyOption = {
  sourceType: 'unambiguous',
  allowImportExportEverywhere: true,
  allowAwaitOutsideFunction: true,
  allowReturnOutsideFunction: true,
  allowSuperOutsideMethod: true,
  allowUndeclaredExports: true,
  createParenthesizedExpressions: true,
  errorRecovery: true,
  plugins: ['typescript', 'decorators-legacy'],
};

/**
 * 文件生成ast树 ast报错继续解析
 *
 * @param {string} file
 * @returns {any}
 */
export function genAst(file: string): AnyOption | null {
  try {
    const fileContent = fs.readFileSync(file).toString();
    const ast: AstType = parse(fileContent, parseConfig);
    return ast;
  } catch (err) {
    return null;
  }
}

/**
 * 代码生成ast树 ast报错继续解析
 *
 * @export
 * @param {string} code
 * @return {*}  {(AnyOption | null)}
 */
export function genAstFromCode(code: string): AnyOption | null {
  if (!code) return null;
  try {
    const ast: AstType = parse(code, parseConfig);
    return ast;
  } catch (err) {
    return null;
  }
}

/**
 * 生成随机字符串
 *
 * @param {number} len
 * @returns
 */
export const randomString = (len?: number) => {
  const length: number = len || 32;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'; /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */
  const maxPos = $chars.length;
  let pwd = '';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
