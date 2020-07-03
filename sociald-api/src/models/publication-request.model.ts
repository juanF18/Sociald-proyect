import {Entity, model, property} from '@loopback/repository';

@model()
export class PublicationRequest extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    default: 'request message',
  })
  messages?: string;


  constructor(data?: Partial<PublicationRequest>) {
    super(data);
  }
}

export interface PublicationRequestRelations {
  // describe navigational properties here
}

export type PublicationRequestWithRelations = PublicationRequest & PublicationRequestRelations;
