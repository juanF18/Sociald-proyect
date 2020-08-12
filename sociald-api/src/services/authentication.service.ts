import {bind, /* inject, */ BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {generate as passGenerator} from 'generate-password';
import * as jwt from 'jsonwebtoken';
import {PasswordKeys as passKeys} from '../keys/password-keys';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {CryptingService} from './crypting.service';

const jwt_secret_key = 'IDONTKNOWYOU';

// Create the Auth service
@bind({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(CryptingService)
    public cryptingService: CryptingService,
  ) {}

  async ResetPassword(email: string): Promise<string | false> {
    let user = await this.userRepository.findOne({where: {email: email}});

    if (user) {
      let randomPass = await this.GenerateRandomPassword();
      let encryptPassword = this.cryptingService.getDoubledMd5Password(
        randomPass,
      );
      user.password = encryptPassword;

      this.userRepository.replaceById(user.id, user);

      return randomPass;
    }

    return false;
  }

  async GenerateRandomPassword() {
    let randomPass = passGenerator({
      length: passKeys.LENGTH,
      numbers: passKeys.NUMBERS,
      lowercase: passKeys.LOWE_CASE,
      uppercase: passKeys.UPPER_CASE,
    });

    return randomPass;
  }
}
