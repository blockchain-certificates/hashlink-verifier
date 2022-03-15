/*!
 * Copyright (c) 2019-2020 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

import {
  encode as _encode,
  decode as _decode
} from './baseN.js';

// base58 characters (Bitcoin alphabet)
function getAlphabet (): string {
  return '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
}

export function encode (input: Uint8Array, maxline?: number): string {
  return _encode(input, getAlphabet(), maxline);
}

export function decode (input: string): Uint8Array {
  return _decode(input, getAlphabet());
}
