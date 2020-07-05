import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Category,
  Publication,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryPublicationController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/publication', {
    responses: {
      '200': {
        description: 'Publication belonging to Category',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async getPublication(
    @param.path.string('id') id: typeof Category.prototype.id,
  ): Promise<Publication> {
    return this.categoryRepository.publication(id);
  }
}
