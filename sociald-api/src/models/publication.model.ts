import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Person} from './person.model';
import {PublicationRequest} from './publication-request.model';
import {Category} from './category.model';

@model()
export class Publication extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  code?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    default: 'Publication description',
  })
  description?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  status?: boolean;

  @belongsTo(() => Person)
  personId: string;

  @hasMany(() => PublicationRequest)
  publicationRequests: PublicationRequest[];

  @belongsTo(() => Category)
  categoryId?: string;

  constructor(data?: Partial<Publication>) {
    super(data);
  }
}

export interface PublicationRelations {
  // describe navigational properties here
}

export type PublicationWithRelations = Publication & PublicationRelations;
