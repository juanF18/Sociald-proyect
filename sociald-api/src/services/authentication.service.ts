import {bind, /* inject, */ BindingScope, service} from '@loopback/core';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { User } from '../models';
import { CryptingService } from './crypting.service';
import * as jwt from 'jsonwebtoken';


const jwt_secret_key = "IDONTKNOWYOU";

@bind({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(CryptingService)
    public cryptingService: CryptingService
  ) {}

  async identify(
    username: string,
    password: string
  ):Promise<User | false>
  {
    const user = await this.userRepository.findOne({
        where: {
          username: username
        }
      });

      if(user){
        const encryptedPassword = this.cryptingService.getDoubledMd5Password(password);

        if(user.password === encryptedPassword){
          return user;
        }else{
          return false;
        }
      }
      return false;
  }

  async generateToken(user: User){
    let expiration = Math.floor((Date.now()/1000) * 3600);
    let token = jwt.sign(
      {
        exp: expiration,
        data: {
          _id: user.id,
          username: user.username,
          role: user.role,
          personId: user.personId
        }
      },jwt_secret_key);

    return token;
  }

  async verifyToken(token: string){
    try{
      let data = jwt.verify(token, jwt_secret_key);
      return data;
    }catch(Error){
      return false;
    }
  }
}
