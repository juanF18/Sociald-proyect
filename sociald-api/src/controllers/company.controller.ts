import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

import {
  Company,
  EmailNotification,
  CredentialsRequestBody,
  CompanyMixedUserRequestBody
} from '../models';
import {CompanyRepository, UserRepository} from '../repositories';
import {
  NotificationService,
  JWTService,
  MyUserService,
  Credentials
} from '../services';
import { service } from '@loopback/core';

export class CompanyController {
  constructor(
    @repository(CompanyRepository)
    public companyRepository : CompanyRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(MyUserService)
    public userService: MyUserService,
    @service(JWTService)
    public jwtService: JWTService,
  ) {}

  @post('/company', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  async create(
    @requestBody(CompanyMixedUserRequestBody)
    body: any,
  ): Promise<Company> {
    // Separe the password of the rest of the body
    const {email, password, ...companyBody} = body;
    const role = 'company';

    // Create the person
    const savedCompany: Company = await this.companyRepository.create(companyBody);

    // Encrypt the password two times using our Crypting Service
    const encryptedPassword = await hash(password, await genSalt());

    // Prepare the data of the user with the password encrypted
    const newUserData = {
      email: email,
      password: encryptedPassword,
      username: savedCompany.name,
      role: role,
    };

    const savedUser = await this.companyRepository.user(savedCompany.id).create(newUserData);

    await this.userRepository.userCredentials(savedUser.id).create({
      password: encryptedPassword,
      email: email,
      role: role
    });

    let emailData: EmailNotification = new EmailNotification({
      subject: 'Welcome to SocialD',
      body: 'Bienvenid@ a la nueva pagina de reclutamiento de programadores',
      text: `Hola <strong>${savedCompany.name}</strong> espereamos que te guste nuestra pagina recuerda que tu contrseña es ${password} `,
      to: email,
    });

    let sendEmail: boolean = await new NotificationService().EmailNotification(
      emailData,
    );

    if (sendEmail) {
      console.log('Message send!');
    }

    return savedCompany;
  }

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

  @get('/company/count', {
    responses: {
      '200': {
        description: 'Company model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Company) where?: Where<Company>,
  ): Promise<Count> {
    return this.companyRepository.count(where);
  }

  @get('/company', {
    responses: {
      '200': {
        description: 'Array of Company model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Company, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Company) filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.companyRepository.find(filter);
  }

  @authenticate('socialdjwt')
  @patch('/company', {
    responses: {
      '200': {
        description: 'Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Company,
    @param.where(Company) where?: Where<Company>,
  ): Promise<Count> {
    return this.companyRepository.updateAll(company, where);
  }

  @get('/company/{id}', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Company, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Company, {exclude: 'where'}) filter?: FilterExcludingWhere<Company>
  ): Promise<Company> {
    return this.companyRepository.findById(id, filter);
  }

  @authenticate('socialdjwt')
  @patch('/company/{id}', {
    responses: {
      '204': {
        description: 'Company PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Company,
  ): Promise<void> {
    await this.companyRepository.updateById(id, company);
  }

  @authenticate('socialdjwt')
  @put('/company/{id}', {
    responses: {
      '204': {
        description: 'Company PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() company: Company,
  ): Promise<void> {
    await this.companyRepository.replaceById(id, company);
  }

  @authenticate('socialdjwt')
  @del('/company/{id}', {
    responses: {
      '204': {
        description: 'Company DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyRepository.deleteById(id);
  }
}
