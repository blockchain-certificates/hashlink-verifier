/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';
// @ts-expect-error not a TS package
import * as base58 from 'base58-universal';
import { blake2b } from 'blakejs';
import crypto from './crypto';
import { stringToUint8Array } from './util';

export abstract class Codec {
  identifier: Uint8Array;
  algorithm: string;
  name: string;
  abstract encode (input: Uint8Array): Promise<Uint8Array>;
  abstract decode (input: Uint8Array): Uint8Array;
}

class MultihashSha2256 extends Codec {
  /**
   * Creates a new MultihashSha2256 data codec.
   *
   * @returns {MultihashSha2256} A MultihashSha2256 used to encode and decode
   *   Multihash SHA-2 256-bit values.
   */
  constructor () {
    super();
    this.identifier = new Uint8Array([0x12, 0x20]);
    this.algorithm = 'mh-sha2-256';
    this.name = 'sha2-256';
  }

  /**
   * Encoder that takes a Uint8Array as input and performs a SHA-2
   * cryptographic hash on the data and outputs a multihash-encoded value.
   *
   * @param {Uint8Array} input - The input for the encode function.
   *
   * @returns {Uint8Array} The output of the encode function.
   */
  async encode (input: Uint8Array): Promise<Uint8Array> {
    const sha2256 = new Uint8Array(
      await crypto.subtle.digest({ name: 'SHA-256' }, input));
    const mhsha2256 = new Uint8Array(
      sha2256.byteLength + this.identifier.byteLength);

    mhsha2256.set(this.identifier, 0);
    mhsha2256.set(sha2256, this.identifier.byteLength);

    return mhsha2256;
  }

  decode (input: Uint8Array): Uint8Array {
    return input.slice(this.identifier.length);
  }
}

class MultihashBlake2b64 extends Codec {
  /**
   * Creates a new MultihashBlake2b64 data codec.
   *
   * @returns {MultihashBlake2b64} A MultihashBlake2b64 used to encode and
   *   decode Multihash Blake2b 64-bit values.
   */
  constructor () {
    super();
    this.identifier = new Uint8Array([0xb2, 0x08, 0x08]);
    this.algorithm = 'mh-blake2b-64';
    this.name = 'blake2b-64';
  }

  /**
   * Encoder function that takes a Uint8Array as input and performs a blake2b
   * cryptographic hash on the data and outputs a multihash-encoded value.
   *
   * @param {Uint8Array} input - The input for the encode function.
   *
   * @returns {Uint8Array} The output of the encode function.
   */
  async encode (input: Uint8Array): Promise<Uint8Array> {
    const blake2b64 = blake2b(input, null, 8);
    const mhblake2b64 = new Uint8Array(
      blake2b64.byteLength + this.identifier.byteLength);

    mhblake2b64.set(this.identifier, 0);
    mhblake2b64.set(blake2b64, this.identifier.byteLength);

    return mhblake2b64;
  }

  decode (input: Uint8Array): Uint8Array {
    return input.slice(this.identifier.length);
  }
}

class MultibaseBase58btc extends Codec {
  /**
   * Creates a new MultibaseBase58btc data codec.
   *
   * @returns {MultibaseBase58btc} A MultibaseBase58btc used to encode and
   *   decode Multibase base58btc values.
   */
  constructor () {
    super();
    this.identifier = new Uint8Array([0x7a]);
    this.algorithm = 'mb-base58-btc';
    this.name = 'base58-btc';
  }

  /**
   * Encoder function that takes a Uint8Array as input and performs a multibase
   * base58btc encoding on the data.
   *
   * @param {Uint8Array} input - The input for the encode function.
   *
   * @returns {Uint8Array} The output of the encode function.
   */
  async encode (input: Uint8Array): Promise<Uint8Array> {
    return new Uint8Array(stringToUint8Array('z' + base58.encode(input)));
  }

  /**
   * Decoder function that takes a Uint8Array as input and performs a multibase
   * base58btc decode on the data.
   *
   * @param {Uint8Array} input - The input for the decode function.
   *
   * @returns {Uint8Array} The output of the decode function.
   */
  decode (input: Uint8Array): Uint8Array {
    return base58.decode(new TextDecoder('utf-8').decode(input.slice(1)));
  }
}

export {
  MultihashSha2256,
  MultihashBlake2b64,
  MultibaseBase58btc
};
