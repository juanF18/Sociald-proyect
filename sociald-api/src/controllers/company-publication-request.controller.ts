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
  Company,
  PublicationRequest,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyPublicationRequestController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Array of Company has many PublicationRequest',
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
    return this.companyRepository.publicationRequests(id).find(filter);
  }

  @post('/companies/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(PublicationRequest)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PublicationRequest, {
            title: 'NewPublicationRequestInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) publicationRequest: Omit<PublicationRequest, 'id'>,
  ): Promise<PublicationRequest> {
    return this.companyRepository.publicationRequests(id).create(publicationRequest);
  }

  @patch('/companies/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Company.PublicationRequest PATCH success count',
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
    return this.companyRepository.publicationRequests(id).patch(publicationRequest, where);
  }

  @del('/companies/{id}/publication-requests', {
    responses: {
      '200': {
        description: 'Company.PublicationRequest DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(PublicationRequest)) where?: Where<PublicationRequest>,
  ): Promise<Count> {
    return this.companyRepository.publicationRequests(id).delete(where);
  }
}
