import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {PersonSkill} from './person-skill.model';
import {Publication} from './publication.model';
import {User} from './user.model';

@model()
export class Person extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
  })
  profilPicPath?: string;

  @hasOne(() => User)
  user: User;

  @hasMany(() => PersonSkill)
  personSkills: PersonSkill[];

  @hasMany(() => Publication)
  publications: Publication[];

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;

const PersonMixedUserSchema = {
  type: 'object',
  required: ['code', 'name', 'lastname', 'phone', 'email', 'password'],
  properties: {
    name: {type: 'string'},
    lastname: {type: 'string'},
    phone: {type: 'string'},
    profilPicPath: {type: 'string'},
    email: {type: 'string', format: 'email'},
    password: {type: 'string', minLength: 8},
  },
};

export const PersonMixedUserRequestBody = {
  description: 'The form for create a person',
  required: true,
  content: {
    'application/json': {schema: PersonMixedUserSchema},
  },
};
