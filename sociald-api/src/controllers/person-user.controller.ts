import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Person,
  User,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonUserController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/user', {
    responses: {
      '200': {
        description: 'Person has one User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User> {
    return this.personRepository.user(id).get(filter);
  }

  @post('/people/{id}/user', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.personRepository.user(id).create(user);
  }

  @patch('/people/{id}/user', {
    responses: {
      '200': {
        description: 'Person.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.personRepository.user(id).patch(user, where);
  }

  @del('/people/{id}/user', {
    responses: {
      '200': {
        description: 'Person.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.personRepository.user(id).delete(where);
  }
}
