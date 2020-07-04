import {bind, /* inject, */ BindingScope} from '@loopback/core';
import * as cryptojs from 'crypto-js';

@bind({scope: BindingScope.TRANSIENT})
export class CryptingService {
  constructor(/* Add @inject to inject parameters */) {}

  md5Encrypt(text: string){
    return cryptojs.MD5(text).toString();
  }

  getDoubledMd5Password(text: string){
    let nonPassword = this.md5Encrypt(text);
    return this.md5Encrypt(nonPassword);
  }
}
