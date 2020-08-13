import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';
import { Person } from './person.model';
import { Company } from './company.model';

@model({
  settings: {
    strict: false,
  },
})
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @belongsTo(() => Person)
  personId?: string;

  @belongsTo(() => Company)
  companyId?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
