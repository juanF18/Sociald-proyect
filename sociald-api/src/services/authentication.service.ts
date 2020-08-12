import {bind, /* inject, */ BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {generate as passGenerator} from 'generate-password';
import {PasswordKeys as passKeys} from '../keys/password-keys';
import {UserRepository} from '../repositories';
import {genSalt, hash} from 'bcryptjs';

const jwt_secret_key = 'IDONTKNOWYOU';

// Create the Auth service
@bind({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  async ResetPassword(email: string): Promise<string | false> {
    let user = await this.userRepository.findOne({where: {email: email}});

    if (user) {
      let randomPass = await this.GenerateRandomPassword();
      let encryptPassword = await hash(randomPass, await genSalt());
      user.password = encryptPassword;

      this.userRepository.updateById(user.id, user);

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
