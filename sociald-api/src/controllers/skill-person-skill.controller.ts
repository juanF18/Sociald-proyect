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
  Skill,
  PersonSkill,
} from '../models';
import {SkillRepository} from '../repositories';

export class SkillPersonSkillController {
  constructor(
    @repository(SkillRepository) protected skillRepository: SkillRepository,
  ) { }

  @get('/skills/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Array of Skill has many PersonSkill',
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
    return this.skillRepository.personSkills(id).find(filter);
  }

  @post('/skills/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {'application/json': {schema: getModelSchemaRef(PersonSkill)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Skill.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PersonSkill, {
            title: 'NewPersonSkillInSkill',
            exclude: ['id'],
            optional: ['skillId']
          }),
        },
      },
    }) personSkill: Omit<PersonSkill, 'id'>,
  ): Promise<PersonSkill> {
    return this.skillRepository.personSkills(id).create(personSkill);
  }

  @patch('/skills/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Skill.PersonSkill PATCH success count',
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
    return this.skillRepository.personSkills(id).patch(personSkill, where);
  }

  @del('/skills/{id}/person-skills', {
    responses: {
      '200': {
        description: 'Skill.PersonSkill DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PersonSkill)) where?: Where<PersonSkill>,
  ): Promise<Count> {
    return this.skillRepository.personSkills(id).delete(where);
  }
}
