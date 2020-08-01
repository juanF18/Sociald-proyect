// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {EmailNotification, SmsNotification} from '../models';
import {PersonRepository, UserRepository} from '../repositories';
import {NotificationService} from '../services';
import {AuthenticationService} from '../services/authentication.service';

// import {inject} from '@loopback/core';

class Credentials {
  username: string;
  password: string;
}

class PasswordResetData {
  username: string;
  type: number;
}

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(AuthenticationService)
    public authenticationService: AuthenticationService,
    @repository(PersonRepository)
    public personRepository: PersonRepository,
  ) {}

  @post('login', {
    responses: {
      '200': {
        description: 'Login for Users',
      },
    },
  })
  async login(@requestBody() credentials: Credentials): Promise<object> {
    // Use the authService to identify the params credentials
    const authResponse = await this.authenticationService.identify(
      credentials.username,
      credentials.password,
    );

    // If the user is identified then generate the token with our auth service
    if (authResponse) {
      let tk = await this.authenticationService.generateToken(authResponse);

      return {
        data: authResponse,
        token: tk,
      };
    } else {
      throw new HttpErrors[401]('User or Password invalid.');
    }
  }

  @post('/password-reset', {
    responses: {
      description: {
        '200': {
          description: 'reset for Users',
        },
      },
    },
  })
  async reset(@requestBody() data: PasswordResetData): Promise<boolean> {
    let randonPassword = await this.authenticationService.ResetPassword(
      data.username,
    );
    let person = await this.personRepository.findOne({
      where: {email: data.username},
    });
    if (randonPassword) {
      //Send new passwor
      //1. sms
      //2. mail
      switch (data.type) {
        case 1:
          if (person) {
            let notification = new SmsNotification({
              body: `Su nueva contraseña es ${randonPassword}`,
              to: person.phone,
            });
            let sms = await new NotificationService().SmsNotification(
              notification,
            );
            if (sms) {
              console.log('SMS enviado');
              return true;
            }
            throw new HttpErrors[400]('telefono no encontrado');
          }
        case 2:
          if (person) {
            let notification = new EmailNotification({
              body: 'Cambio de contraseña',
              text: `La contrseña generada es es <strong>${randonPassword}</strong>`,
              to: person.email,
              subject: 'Nueva contraseña',
            });
            let mail = await new NotificationService().EmailNotification(
              notification,
            );
            if (mail) {
              console.log('Email eviado');
              return true;
            }
            throw new HttpErrors[400]('Email not found');
          }
          throw new HttpErrors[400]('Notificacion no soportada');

        default:
          throw new HttpErrors[400]('User not fount');
      }
    }
    return false;
  }
}
