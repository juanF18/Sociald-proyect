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
  Skill,
} from '../models';
import {PersonSkillRepository} from '../repositories';

export class PersonSkillSkillController {
  constructor(
    @repository(PersonSkillRepository)
    public personSkillRepository: PersonSkillRepository,
  ) { }

  @get('/person-skills/{id}/skill', {
    responses: {
      '200': {
        description: 'Skill belonging to PersonSkill',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Skill)},
          },
        },
      },
    },
  })
  async getSkill(
    @param.path.string('id') id: typeof PersonSkill.prototype.id,
  ): Promise<Skill> {
    return this.personSkillRepository.skill(id);
  }
}
