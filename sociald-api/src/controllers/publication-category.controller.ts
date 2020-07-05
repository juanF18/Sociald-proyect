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
  Category,
} from '../models';
import {PublicationRepository} from '../repositories';

export class PublicationCategoryController {
  constructor(
    @repository(PublicationRepository) protected publicationRepository: PublicationRepository,
  ) { }

  @get('/publications/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Publication has many Category',
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
    return this.publicationRepository.categories(id).find(filter);
  }

  @post('/publications/{id}/categories', {
    responses: {
      '200': {
        description: 'Publication model instance',
        content: {'application/json': {schema: getModelSchemaRef(Category)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Publication.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategoryInPublication',
            exclude: ['id'],
            optional: ['publicationId']
          }),
        },
      },
    }) category: Omit<Category, 'id'>,
  ): Promise<Category> {
    return this.publicationRepository.categories(id).create(category);
  }

  @patch('/publications/{id}/categories', {
    responses: {
      '200': {
        description: 'Publication.Category PATCH success count',
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
    return this.publicationRepository.categories(id).patch(category, where);
  }

  @del('/publications/{id}/categories', {
    responses: {
      '200': {
        description: 'Publication.Category DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Category)) where?: Where<Category>,
  ): Promise<Count> {
    return this.publicationRepository.categories(id).delete(where);
  }
}
