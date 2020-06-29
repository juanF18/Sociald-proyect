import {Entity, model, property} from '@loopback/repository';

@model()
export class ServiceRequest extends Entity {
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
  description: string;


  constructor(data?: Partial<ServiceRequest>) {
    super(data);
  }
}

export interface ServiceRequestRelations {
  // describe navigational properties here
}

export type ServiceRequestWithRelations = ServiceRequest & ServiceRequestRelations;
