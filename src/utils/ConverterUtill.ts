import {encode, decode} from 'base-64';

export class ConverterUtils {
  static uint8ToBase64(u8Arr: Uint8Array) {
    let binary = '';
    const bytes = [].slice.call(u8Arr);
    bytes.forEach(b => (binary += String.fromCharCode(b)));
    return encode(binary);
  }

  static base64ToArrayBuffer(base64: string) {
    const binary_string = decode(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
