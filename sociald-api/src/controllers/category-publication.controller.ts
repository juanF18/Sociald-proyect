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
  Category,
  Publication,
} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryPublicationController {
  constructor(
    @repository(CategoryRepository) protected categoryRepository: CategoryRepository,
  ) { }

  @get('/categories/{id}/publications', {
    responses: {
      '200': {
        description: 'Array of Category has many Publication',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publication)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publication>,
  ): Promise<Publication[]> {
    return this.categoryRepository.publications(id).find(filter);
  }

  @post('/categories/{id}/publications', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publication)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Category.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {
            title: 'NewPublicationInCategory',
            exclude: ['id'],
            optional: ['categoryId']
          }),
        },
      },
    }) publication: Omit<Publication, 'id'>,
  ): Promise<Publication> {
    return this.categoryRepository.publications(id).create(publication);
  }

  @patch('/categories/{id}/publications', {
    responses: {
      '200': {
        description: 'Category.Publication PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {partial: true}),
        },
      },
    })
    publication: Partial<Publication>,
    @param.query.object('where', getWhereSchemaFor(Publication)) where?: Where<Publication>,
  ): Promise<Count> {
    return this.categoryRepository.publications(id).patch(publication, where);
  }

  @del('/categories/{id}/publications', {
    responses: {
      '200': {
        description: 'Category.Publication DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publication)) where?: Where<Publication>,
  ): Promise<Count> {
    return this.categoryRepository.publications(id).delete(where);
  }
}
