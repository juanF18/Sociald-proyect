// Uncomment these imports to begin using these cool features!

import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {EmailNotification, CredentialsRequestBody} from '../models';
import {UserRepository} from '../repositories';
import {NotificationService, Credentials, MyUserService, JWTService} from '../services';
import {AuthenticationService} from '../services/authentication.service';


export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(MyUserService)
    public userService: MyUserService,
    @service(JWTService)
    public jwtService: JWTService,
    @service(AuthenticationService)
    public authenticationService: AuthenticationService,
    @service(NotificationService)
    public notificationService: NotificationService,
  ) {}

  @post('login', {
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

  @post('/password-reset', {
    responses: {
      description: {
        '200': {
          description: 'reset for Users',
        },
      },
    },
  })
  async reset(
    @requestBody({
      description: 'The input of login function',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string' },
            }
          }
        },
      },
    })
    data: any
  ): Promise<string> {
    let user = await this.userRepository.findOne({
      where: {email: data.email},
    });

    if (user) {
      let randomPassword = await this.authenticationService.ResetPassword(data.email);

      if (randomPassword) {
        let notification = new EmailNotification({
          body: 'Cambio de contraseña',
          text: `La contraseña generada es es <strong>${randomPassword}</strong>`,
          to: user.email,
          subject: 'Nueva contraseña',
        });

        let mail = await this.notificationService.EmailNotification(
          notification,
        );

        if (mail) {
          return "Email Enviado";
        }

        throw new HttpErrors[400]('Notificacion no soportada');
      }

      throw new HttpErrors[400]('Problema al crear la contraseña');
    }

    throw new HttpErrors[400]('Usuario no encontrado');
  }
}
