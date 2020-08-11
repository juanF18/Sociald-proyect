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
import {Publication} from '../models';
import {PublicationRepository} from '../repositories';
import { service } from '@loopback/core';
import { CodeGeneratorService } from '../services/code-generator.service';

export class PublicationController {
  constructor(
    @repository(PublicationRepository)
    public publicationRepository : PublicationRepository,
    @service(CodeGeneratorService)
    private codeGeneratorService: CodeGeneratorService,
  ) {}

  @post('/publication', {
    responses: {
      '200': {
        description: 'Publication model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publication)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {
            title: 'NewPublication',
            exclude: ['id', 'code'],
          }),
        },
      },
    })
    publication: Omit<Publication, 'id'>,
  ): Promise<Publication> {
    let searchName = await this.publicationRepository.findOne({
      where: { name: publication.name }
    });

    if(searchName) {
      throw new HttpErrors.UnprocessableEntity("This area name already exists!")
    }

    let count = (await this.publicationRepository.count()).count;

    let withCode = {
      ...publication,
      code: await this.codeGeneratorService.genNextCode(count),
    };

    return this.publicationRepository.create(withCode);
  }

  @get('/publication/count', {
    responses: {
      '200': {
        description: 'Publication model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Publication) where?: Where<Publication>,
  ): Promise<Count> {
    return this.publicationRepository.count(where);
  }

  @get('/publication', {
    responses: {
      '200': {
        description: 'Array of Publication model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Publication, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Publication) filter?: Filter<Publication>,
  ): Promise<Publication[]> {
    return this.publicationRepository.find(filter);
  }

  @patch('/publication', {
    responses: {
      '200': {
        description: 'Publication PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Publication,
    @param.where(Publication) where?: Where<Publication>,
  ): Promise<Count> {
    return this.publicationRepository.updateAll(publication, where);
  }

  @get('/publication/{id}', {
    responses: {
      '200': {
        description: 'Publication model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Publication, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Publication, {exclude: 'where'}) filter?: FilterExcludingWhere<Publication>
  ): Promise<Publication> {
    return this.publicationRepository.findById(id, filter);
  }

  @patch('/publication/{id}', {
    responses: {
      '204': {
        description: 'Publication PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Publication,
  ): Promise<void> {
    await this.publicationRepository.updateById(id, publication);
  }

  @put('/publication/{id}', {
    responses: {
      '204': {
        description: 'Publication PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publication: Publication,
  ): Promise<void> {
    await this.publicationRepository.replaceById(id, publication);
  }

  @del('/publication/{id}', {
    responses: {
      '204': {
        description: 'Publication DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicationRepository.deleteById(id);
  }
}
