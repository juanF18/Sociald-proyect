import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PublicationRequest,
  Company,
} from '../models';
import {PublicationRequestRepository} from '../repositories';

export class PublicationRequestCompanyController {
  constructor(
    @repository(PublicationRequestRepository)
    public publicationRequestRepository: PublicationRequestRepository,
  ) { }

  @get('/publication-requests/{id}/company', {
    responses: {
      '200': {
        description: 'Company belonging to PublicationRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async getCompany(
    @param.path.string('id') id: typeof PublicationRequest.prototype.id,
  ): Promise<Company> {
    return this.publicationRequestRepository.company(id);
  }
}
