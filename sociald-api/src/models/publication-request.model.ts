import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Company} from './company.model';
import {Publication} from './publication.model';

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
  message?: string;

  @belongsTo(() => Company)
  companyId: string;

  @belongsTo(() => Publication)
  publicationId: string;

  constructor(data?: Partial<PublicationRequest>) {
    super(data);
  }
}

export interface PublicationRequestRelations {
  // describe navigational properties here
}

export type PublicationRequestWithRelations = PublicationRequest & PublicationRequestRelations;
