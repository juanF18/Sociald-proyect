import {bind, /* inject, */ BindingScope} from '@loopback/core';

@bind({scope: BindingScope.TRANSIENT})
export class CodeGeneratorService {
  constructor(/* Add @inject to inject parameters */) {}

  async genNextCode(count: number): Promise<number>{
    let code = count + Math.ceil(new Date().getTime() / 1000000);

    return code;
  }
}
