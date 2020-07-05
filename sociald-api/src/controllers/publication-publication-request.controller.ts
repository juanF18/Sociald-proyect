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
  Publication,
  PublicationRequest,
} from '../models';
import {PublicationRepository} from '../repositories';

export class PublicationPublicationRequestController {
  constructor(
    @repository(PublicationRepository) protected publicationRepository: PublicationRepository,
  ) { }

  @get('/publications/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Array of Publication has many PublicationRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PublicationRequest)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<PublicationRequest>,
  ): Promise<PublicationRequest[]> {
    return this.publicationRepository.publicationRequests(id).find(filter);
  }

  @post('/publications/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Publication model instance',
        content: {'application/json': {schema: getModelSchemaRef(PublicationRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Publication.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationRequest, {
            title: 'NewPublicationRequestInPublication',
            exclude: ['id'],
            optional: ['publicationId']
          }),
        },
      },
    }) publicationRequest: Omit<PublicationRequest, 'id'>,
  ): Promise<PublicationRequest> {
    return this.publicationRepository.publicationRequests(id).create(publicationRequest);
  }

  @patch('/publications/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Publication.PublicationRequest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationRequest, {partial: true}),
        },
      },
    })
    publicationRequest: Partial<PublicationRequest>,
    @param.query.object('where', getWhereSchemaFor(PublicationRequest)) where?: Where<PublicationRequest>,
  ): Promise<Count> {
    return this.publicationRepository.publicationRequests(id).patch(publicationRequest, where);
  }

  @del('/publications/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Publication.PublicationRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PublicationRequest)) where?: Where<PublicationRequest>,
  ): Promise<Count> {
    return this.publicationRepository.publicationRequests(id).delete(where);
  }
}
