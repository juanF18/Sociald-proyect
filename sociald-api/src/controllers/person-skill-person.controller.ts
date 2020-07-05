import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PersonSkill,
  Person,
} from '../models';
import {PersonSkillRepository} from '../repositories';

export class PersonSkillPersonController {
  constructor(
    @repository(PersonSkillRepository)
    public personSkillRepository: PersonSkillRepository,
  ) { }

  @get('/person-skills/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to PersonSkill',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof PersonSkill.prototype.id,
  ): Promise<Person> {
    return this.personSkillRepository.person(id);
  }
}
