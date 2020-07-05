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
  Area,
  Category,
} from '../models';
import {AreaRepository} from '../repositories';

export class AreaCategoryController {
  constructor(
    @repository(AreaRepository) protected areaRepository: AreaRepository,
  ) { }

  @get('/areas/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Area has many Category',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Category)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Category>,
  ): Promise<Category[]> {
    return this.areaRepository.categories(id).find(filter);
  }

  @post('/areas/{id}/categories', {
    responses: {
      '200': {
        description: 'Area model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Area.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategoryInArea',
            exclude: ['id'],
            optional: ['areaId']
          }),
        },
      },
    }) category: Omit<Category, 'id'>,
  ): Promise<Category> {
    return this.areaRepository.categories(id).create(category);
  }

  @patch('/areas/{id}/categories', {
    responses: {
      '200': {
        description: 'Area.Category PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Partial<Category>,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.areaRepository.categories(id).patch(category, where);
  }

  @del('/areas/{id}/categories', {
    responses: {
      '200': {
        description: 'Area.Category DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.areaRepository.categories(id).delete(where);
  }
}
