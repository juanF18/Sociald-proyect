import {bind, /* inject, */ BindingScope} from '@loopback/core';

@bind({scope: BindingScope.TRANSIENT})
export class CodeGeneratorService {
  constructor(/* Add @inject to inject parameters */) {}

  getRandomInt(max: number): number {
    return Math.ceil(Math.random() * max);
  }

  async genNextCode(count: number): Promise<number>{
    let code = count + this.getRandomInt(count + 1000);

    return code;
  }
}
