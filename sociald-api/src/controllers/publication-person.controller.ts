import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Publication,
  Person,
} from '../models';
import {PublicationRepository} from '../repositories';

export class PublicationPersonController {
  constructor(
    @repository(PublicationRepository)
    public publicationRepository: PublicationRepository,
  ) { }

  @get('/publications/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Publication',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Publication.prototype.id,
  ): Promise<Person> {
    return this.publicationRepository.person(id);
  }
}
