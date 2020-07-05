import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Person} from './person.model';
import {Skill} from './skill.model';

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

  @belongsTo(() => Person)
  personId: string;

  @belongsTo(() => Skill)
  skillId: string;

  constructor(data?: Partial<PersonSkill>) {
    super(data);
  }
}

export interface PersonSkillRelations {
  // describe navigational properties here
}

export type PersonSkillWithRelations = PersonSkill & PersonSkillRelations;
