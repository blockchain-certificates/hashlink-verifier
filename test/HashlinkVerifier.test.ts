import { HashlinkVerifier } from '../src/HashlinkVerifier';

describe('HashlinkVerifier test suite', function () {
  describe('decode method', function () {
    describe('given it is passed a hashlink', function () {
      it('should return the decoded hashlink value', async function () {
        const fixture = 'hl:zQmR7NGj4Lvqz18qubNdcFxDAG3thfKEHMGNu77FMHUHfuT:zBDkTKnBtUAv5HEo4G6JJ53mucK3cuo4XAhzwYirGBYASgPWkmGFtAx3FdDT8Lb8iNVDfcqjVkSM1yfrN1wSPeDmom5RkRzuZjvoqnD1o5tNMwfS7dBv2h4xUMjyEwJPeasyz6YNTKEe1JD55U5Uv14GjCq6E';
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
        const instance = new HashlinkVerifier();
        const output = await instance.decode(fixture);
        expect(output).toEqual(expectedOutput);
      });
    });
  });
});
