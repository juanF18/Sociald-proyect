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
  Area,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryAreaController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/area', {
    responses: {
      '200': {
        description: 'Area belonging to Category',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Area)},
          },
        },
      },
    },
  })
  async getArea(
    @param.path.string('id') id: typeof Category.prototype.id,
  ): Promise<Area> {
    return this.categoryRepository.area(id);
  }
}
