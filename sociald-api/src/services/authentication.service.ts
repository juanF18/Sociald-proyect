import {bind, /* inject, */ BindingScope, service} from '@loopback/core';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { User } from '../models';
import { CryptingService } from './crypting.service';
import * as jwt from 'jsonwebtoken';


const jwt_secret_key = "IDONTKNOWYOU";

// Create the Auth service
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
    /*
      Gets the user in database and validate credentials
    */
    // Try to get the user in the db
    const user = await this.userRepository.findOne({
        where: {
          username: username
        }
      });

      // If the user exists then double-crypt the password
      if(user){
        const encryptedPassword = this.cryptingService.getDoubledMd5Password(password);

        // If the param password is equal to the password in the db return that user
        if(user.password === encryptedPassword){
          return user;
        }else{
          return false;
        }
      }
      return false;
  }

  async generateToken(user: User){
    /*
      Parse the data to tokenize and return it
    */
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
    /*
      Try to verify the token passed and return the payload data inside it
     */
    try{
      let data = jwt.verify(token, jwt_secret_key);
      return data;
    }catch(Error){
      return false;
    }
  }
}
