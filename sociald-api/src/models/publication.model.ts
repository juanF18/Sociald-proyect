import {Entity, model, property} from '@loopback/repository';

@model()
export class Publication extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

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


  constructor(data?: Partial<Publication>) {
    super(data);
  }
}

export interface PublicationRelations {
  // describe navigational properties here
}

export type PublicationWithRelations = Publication & PublicationRelations;
