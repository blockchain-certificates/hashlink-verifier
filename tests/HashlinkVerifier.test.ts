import { it, describe, expect, beforeEach, afterEach } from 'vitest';
import { HashlinkVerifier } from '../src/HashlinkVerifier';

const fixture = 'hl:zQmR7NGj4Lvqz18qubNdcFxDAG3thfKEHMGNu77FMHUHfuT:zBDkTKnBtUAv5HEo4G6JJ53mucK3cuo4XAhzwYirGBYASgPWkmGFtAx3FdDT8Lb8iNVDfcqjVkSM1yfrN1wSPeDmom5RkRzuZjvoqnD1o5tNMwfS7dBv2h4xUMjyEwJPeasyz6YNTKEe1JD55U5Uv14GjCq6E';

describe('HashlinkVerifier test suite', function () {
  let instance;

  beforeEach(function () {
    instance = new HashlinkVerifier();
  });

  afterEach(function () {
    instance = null;
  });

  describe('decode method', function () {
    describe('given it is passed a hashlink', function () {
      it('should return the decoded hashlink value', async function () {
        const expectedOutput = {
          hashName: 'sha2-256',
          hashValue: new Uint8Array([
            41, 43, 236, 153, 0, 78, 106, 28, 4, 162, 17, 113, 234, 81, 131, 26, 21, 26, 180, 141, 80, 106, 182, 104, 198, 66, 244, 226, 140, 110, 182, 106
          ]),
          meta: {
            'content-type': 'image/png',
            url: [
              'https://raw.githubusercontent.com/blockchain-certificates/poc-hashlink-blockcerts/master/index.png'
            ]
          }
        };
        const output = await instance.decode(fixture);
        expect(output).toEqual(expectedOutput);
      });
    });
  });

  describe('hasHashlinkToVerify method', function () {
    describe('given no hashlinks were registered', function () {
      it('should return false', function () {
        expect(instance.hasHashlinksToVerify()).toBe(false);
      });
    });

    describe('given hashlinks were registered', function () {
      it('should return true', async function () {
        await instance.decode(fixture);
        expect(instance.hasHashlinksToVerify()).toBe(true);
      });
    });
  });
});
