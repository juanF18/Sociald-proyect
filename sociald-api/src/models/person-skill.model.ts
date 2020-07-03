import {Entity, model, property} from '@loopback/repository';

@model()
export class PersonSkill extends Entity {
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
  experience: number;


  constructor(data?: Partial<PersonSkill>) {
    super(data);
  }
}

export interface PersonSkillRelations {
  // describe navigational properties here
}

export type PersonSkillWithRelations = PersonSkill & PersonSkillRelations;
