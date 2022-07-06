// WebCrypto polyfill
import isomorphicCrypto from '@trust/webcrypto';
let crypto;

if (self.crypto || (self as any).msCrypto) {
  crypto = self.crypto || (self as any).msCrypto;
} else {
  crypto = isomorphicCrypto;
}

export default crypto;
