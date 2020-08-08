// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {EmailNotification, SmsNotification, CredentialsRequestBody} from '../models';
import {PersonRepository, UserRepository} from '../repositories';
import {NotificationService, Credentials, MyUserService, JWTService} from '../services';
import {AuthenticationService} from '../services/authentication.service';

// import {inject} from '@loopback/core';

class PasswordResetData {
  email: string;
  type: number;
}

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(MyUserService)
    public userService: MyUserService,
    @service(JWTService)
    public jwtService: JWTService,
  ) {}

  @post('/company/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  // @post('/password-reset', {
  //   responses: {
  //     description: {
  //       '200': {
  //         description: 'reset for Users',
  //       },
  //     },
  //   },
  // })
  // async reset(@requestBody() data: PasswordResetData): Promise<boolean> {
  //   let randonPassword = await this.authenticationService.ResetPassword(
  //     data.email,
  //   );
  //   let person = await this.userRepository.findOne({
  //     where: {email: data.email},
  //   });

  //   if (randonPassword) {
  //     //Send new passwor
  //     //1. sms
  //     //2. mail
  //     switch (data.type) {
  //       case 1:
  //         if (person) {
  //           let notification = new SmsNotification({
  //             body: `Su nueva contraseña es ${randonPassword}`,
  //             to: person.phone,
  //           });
  //           let sms = await new NotificationService().SmsNotification(
  //             notification,
  //           );
  //           if (sms) {
  //             console.log('SMS enviado');
  //             return true;
  //           }
  //           throw new HttpErrors[400]('telefono no encontrado');
  //         }
  //       case 2:
  //         if (person) {
  //           let notification = new EmailNotification({
  //             body: 'Cambio de contraseña',
  //             text: `La contrseña generada es es <strong>${randonPassword}</strong>`,
  //             to: person.email,
  //             subject: 'Nueva contraseña',
  //           });
  //           let mail = await new NotificationService().EmailNotification(
  //             notification,
  //           );
  //           if (mail) {
  //             console.log('Email eviado');
  //             return true;
  //           }
  //           throw new HttpErrors[400]('Email not found');
  //         }
  //         throw new HttpErrors[400]('Notificacion no soportada');

  //       default:
  //         throw new HttpErrors[400]('User not fount');
  //     }
  //   }
  //   return false;
  // }
}
