import {Entity, hasMany, model, property} from '@loopback/repository';
import {PersonSkill} from './person-skill.model';

@model()
export class Skill extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  name: string;

  @property({
    type: 'string',
    default: 'skill description',
  })
  description?: string;

  @hasMany(() => PersonSkill)
  personSkills: PersonSkill[];

  constructor(data?: Partial<Skill>) {
    super(data);
  }
}

export interface SkillRelations {
  // describe navigational properties here
}

export type SkillWithRelations = Skill & SkillRelations;
