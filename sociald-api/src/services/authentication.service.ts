import {bind, /* inject, */ BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {generate as passGenerator} from 'generate-password';
import {PasswordKeys as passKeys} from '../keys/password-keys';
import {UserRepository, UserCredentialsRepository} from '../repositories';
import {genSalt, hash} from 'bcryptjs';

const jwt_secret_key = 'IDONTKNOWYOU';

// Create the Auth service
@bind({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(
    @repository(UserCredentialsRepository)
    public userCredentialsRepository: UserCredentialsRepository,
  ) {}

  async ResetPassword(email: string): Promise<string | false> {
    let credentials = await this.userCredentialsRepository.findOne({where: {email: email}});

    if (credentials) {
      let randomPass = await this.GenerateRandomPassword();
      let encryptPassword = await hash(randomPass, await genSalt());

      credentials.password = encryptPassword;
      this.userCredentialsRepository.updateById(credentials.id, credentials);

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
