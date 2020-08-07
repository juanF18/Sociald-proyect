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
import {PublicationRequest} from '../models';
import {PublicationRequestRepository} from '../repositories';

export class PublicationRequestController {
  constructor(
    @repository(PublicationRequestRepository)
    public publicationRequestRepository : PublicationRequestRepository,
  ) {}

  @post('/publication-request', {
    responses: {
      '200': {
        description: 'PublicationRequest model instance',
        content: {'application/json': {schema: getModelSchemaRef(PublicationRequest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationRequest, {
            title: 'NewPublicationRequest',
            exclude: ['id'],
          }),
        },
      },
    })
    publicationRequest: Omit<PublicationRequest, 'id'>,
  ): Promise<PublicationRequest> {
    return this.publicationRequestRepository.create(publicationRequest);
  }

  @get('/publication-request/count', {
    responses: {
      '200': {
        description: 'PublicationRequest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PublicationRequest) where?: Where<PublicationRequest>,
  ): Promise<Count> {
    return this.publicationRequestRepository.count(where);
  }

  @get('/publication-request', {
    responses: {
      '200': {
        description: 'Array of PublicationRequest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PublicationRequest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PublicationRequest) filter?: Filter<PublicationRequest>,
  ): Promise<PublicationRequest[]> {
    return this.publicationRequestRepository.find(filter);
  }

  @patch('/publication-request', {
    responses: {
      '200': {
        description: 'PublicationRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationRequest, {partial: true}),
        },
      },
    })
    publicationRequest: PublicationRequest,
    @param.where(PublicationRequest) where?: Where<PublicationRequest>,
  ): Promise<Count> {
    return this.publicationRequestRepository.updateAll(publicationRequest, where);
  }

  @get('/publication-request/{id}', {
    responses: {
      '200': {
        description: 'PublicationRequest model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PublicationRequest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PublicationRequest, {exclude: 'where'}) filter?: FilterExcludingWhere<PublicationRequest>
  ): Promise<PublicationRequest> {
    return this.publicationRequestRepository.findById(id, filter);
  }

  @patch('/publication-request/{id}', {
    responses: {
      '204': {
        description: 'PublicationRequest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationRequest, {partial: true}),
        },
      },
    })
    publicationRequest: PublicationRequest,
  ): Promise<void> {
    await this.publicationRequestRepository.updateById(id, publicationRequest);
  }

  @put('/publication-request/{id}', {
    responses: {
      '204': {
        description: 'PublicationRequest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() publicationRequest: PublicationRequest,
  ): Promise<void> {
    await this.publicationRequestRepository.replaceById(id, publicationRequest);
  }

  @del('/publication-request/{id}', {
    responses: {
      '204': {
        description: 'PublicationRequest DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.publicationRequestRepository.deleteById(id);
  }
}
