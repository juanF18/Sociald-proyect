import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {PublicationRequest} from './publication-request.model';
import {User} from './user.model';

@model()
export class Company extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'number',
    default: 0,
  })
  postalCode?: number;

  @property({
    type: 'string',
  })
  profilPicPath?: string;

  @hasOne(() => User)
  user: User;

  @hasMany(() => PublicationRequest)
  publicationRequests: PublicationRequest[];

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;

const CompanyMixedUserSchema = {
  type: 'object',
  required: ['code', 'name', 'address', 'email', 'password'],
  properties: {
    nit: {type: 'number'},
    name: {type: 'string'},
    address: {type: 'string'},
    postalCode: {type: 'string'},
    email: {type: 'string', format: 'email'},
    password: {type: 'string', minLength: 8},
  },
};

export const CompanyMixedUserRequestBody = {
  description: 'The form for create a company',
  required: true,
  content: {
    'application/json': {schema: CompanyMixedUserSchema},
  },
};
