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
  Publication,
} from '../models';
import {PublicationRequestRepository} from '../repositories';

export class PublicationRequestPublicationController {
  constructor(
    @repository(PublicationRequestRepository)
    public publicationRequestRepository: PublicationRequestRepository,
  ) { }

  @get('/publication-requests/{id}/publication', {
    responses: {
      '200': {
        description: 'Publication belonging to PublicationRequest',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async getPublication(
    @param.path.string('id') id: typeof PublicationRequest.prototype.id,
  ): Promise<Publication> {
    return this.publicationRequestRepository.publication(id);
  }
}
