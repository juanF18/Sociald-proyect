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
  Person,
  Publication,
} from '../models';
import {PersonRepository} from '../repositories';
import { service } from '@loopback/core';
import { CodeGeneratorService } from '../services';

export class PersonPublicationController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
    @service(CodeGeneratorService) protected codeGeneratorService: CodeGeneratorService,
  ) { }

  @get('/people/{id}/publications', {
    responses: {
      '200': {
        description: 'Array of Person has many Publication',
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
    return this.personRepository.publications(id).find(filter);
  }

  @post('/people/{id}/publications', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publication)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publication, {
            title: 'NewPublicationInPerson',
            exclude: ['id', 'code'],
            optional: ['personId']
          }),
        },
      },
    }) publication: Omit<Publication, 'id'>,
  ): Promise<Publication> {
    let count = Math.ceil(Math.random() * 1000);

    let withCode = {
      ...publication,
      code: await this.codeGeneratorService.genNextCode(count),
    };

    return this.personRepository.publications(id).create(withCode);
  }

  @patch('/people/{id}/publications', {
    responses: {
      '200': {
        description: 'Person.Publication PATCH success count',
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
    return this.personRepository.publications(id).patch(publication, where);
  }

  @del('/people/{id}/publications', {
    responses: {
      '200': {
        description: 'Person.Publication DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publication)) where?: Where<Publication>,
  ): Promise<Count> {
    return this.personRepository.publications(id).delete(where);
  }
}
