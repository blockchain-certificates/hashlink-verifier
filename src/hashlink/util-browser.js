// browser TextDecoder/TextEncoder
/* eslint-env browser */
const TextDecoder = self.TextDecoder;
const TextEncoder = self.TextEncoder;
export {TextDecoder, TextEncoder};

export function stringToUint8Array(data) {
  if(typeof data === 'string') {
    // convert data to Uint8Array
    return new TextEncoder().encode(data);
  }
  if(!(data instanceof Uint8Array)) {
    throw new TypeError('"data" be a string or Uint8Array.');
  }
  return data;
}
