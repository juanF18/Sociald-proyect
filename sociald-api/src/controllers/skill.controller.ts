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
  HttpErrors,
} from '@loopback/rest';
import {Skill} from '../models';
import {SkillRepository} from '../repositories';
import { service } from '@loopback/core';
import { CodeGeneratorService } from '../services';

export class SkillController {
  constructor(
    @repository(SkillRepository)
    public skillRepository : SkillRepository,
    @service(CodeGeneratorService)
    private codeGeneratorService: CodeGeneratorService,
  ) {}

  @post('/skill', {
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {'application/json': {schema: getModelSchemaRef(Skill)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {
            title: 'NewSkill',
            exclude: ['id'],
          }),
        },
      },
    })
    skill: Omit<Skill, 'id'>,
  ): Promise<Skill> {
    let searchName = await this.skillRepository.findOne({
      where: { name: skill.name }
    });

    if(searchName) {
      throw new HttpErrors.UnprocessableEntity("This skill name already exists!")
    }

    let count = (await this.skillRepository.count()).count;

    let withCode = {
      ...skill,
      code: await this.codeGeneratorService.genNextCode(count),
    };

    return this.skillRepository.create(skill);
  }

  @get('/skill/count', {
    responses: {
      '200': {
        description: 'Skill model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Skill) where?: Where<Skill>,
  ): Promise<Count> {
    return this.skillRepository.count(where);
  }

  @get('/skill', {
    responses: {
      '200': {
        description: 'Array of Skill model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Skill, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Skill) filter?: Filter<Skill>,
  ): Promise<Skill[]> {
    return this.skillRepository.find(filter);
  }

  @patch('/skill', {
    responses: {
      '200': {
        description: 'Skill PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {partial: true}),
        },
      },
    })
    skill: Skill,
    @param.where(Skill) where?: Where<Skill>,
  ): Promise<Count> {
    return this.skillRepository.updateAll(skill, where);
  }

  @get('/skill/{id}', {
    responses: {
      '200': {
        description: 'Skill model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Skill, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Skill, {exclude: 'where'}) filter?: FilterExcludingWhere<Skill>
  ): Promise<Skill> {
    return this.skillRepository.findById(id, filter);
  }

  @patch('/skill/{id}', {
    responses: {
      '204': {
        description: 'Skill PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Skill, {partial: true}),
        },
      },
    })
    skill: Skill,
  ): Promise<void> {
    await this.skillRepository.updateById(id, skill);
  }

  @put('/skill/{id}', {
    responses: {
      '204': {
        description: 'Skill PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() skill: Skill,
  ): Promise<void> {
    await this.skillRepository.replaceById(id, skill);
  }

  @del('/skill/{id}', {
    responses: {
      '204': {
        description: 'Skill DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.skillRepository.deleteById(id);
  }
}
