import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Category,
} from '../models';
import {PublicationRepository } from '../repositories';

export class PublicationCategoryController {
  constructor(
    @repository(PublicationRepository) protected publicationRepository: PublicationRepository,
  ) { }

  @get('/publications/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to Publication',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: string,
  ): Promise<Category> {
    return this.publicationRepository.category(id);
  }
}
