import crypto from 'crypto';

global.self = {};

Object.defineProperty(global.self, 'crypto', {
  value: {
    // use node 15.x
    subtle: crypto.webcrypto.subtle
  }
});
