// Uncomment these imports to begin using these cool features!

import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { post, requestBody, HttpErrors } from '@loopback/rest';
import { service } from '@loopback/core';
import { AuthenticationService } from '../services/authentication.service';

// import {inject} from '@loopback/core';

class Credentials {
  username: string;
  password: string;
}

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(AuthenticationService)
    public authenticationService: AuthenticationService
  ) {}

  @post('login', {
    responses: {
      '200': {
        description: 'Login for Users'
      }
    }
  })
  async login(
    @requestBody() credentials: Credentials
  ): Promise<object>{
    const authResponse = await this.authenticationService.identify(credentials.username, credentials.password);

    if(authResponse){
      let tk = await this.authenticationService.generateToken(authResponse);

      return {
        data: authResponse,
        token: tk
      }
    }else{
      throw new HttpErrors[401](
        "User or Password invalid."
      )
    }
  }
}
