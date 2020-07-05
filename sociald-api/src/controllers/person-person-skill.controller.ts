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
  PersonSkill,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonPersonSkillController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Array of Person has many PersonSkill',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PersonSkill)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PersonSkill>,
  ): Promise<PersonSkill[]> {
    return this.personRepository.personSkills(id).find(filter);
  }

  @post('/people/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(PersonSkill)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonSkill, {
            title: 'NewPersonSkillInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) personSkill: Omit<PersonSkill, 'id'>,
  ): Promise<PersonSkill> {
    return this.personRepository.personSkills(id).create(personSkill);
  }

  @patch('/people/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Person.PersonSkill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonSkill, {partial: true}),
        },
      },
    })
    personSkill: Partial<PersonSkill>,
    @param.query.object('where', getWhereSchemaFor(PersonSkill)) where?: Where<PersonSkill>,
  ): Promise<Count> {
    return this.personRepository.personSkills(id).patch(personSkill, where);
  }

  @del('/people/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Person.PersonSkill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PersonSkill)) where?: Where<PersonSkill>,
  ): Promise<Count> {
    return this.personRepository.personSkills(id).delete(where);
  }
}
