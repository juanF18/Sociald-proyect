import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PersonSkill, PersonSkillRelations, Person, Skill} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonRepository} from './person.repository';
import {SkillRepository} from './skill.repository';

export class PersonSkillRepository extends DefaultCrudRepository<
  PersonSkill,
  typeof PersonSkill.prototype.id,
  PersonSkillRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof PersonSkill.prototype.id>;

  public readonly skill: BelongsToAccessor<Skill, typeof PersonSkill.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>, @repository.getter('SkillRepository') protected skillRepositoryGetter: Getter<SkillRepository>,
  ) {
    super(PersonSkill, dataSource);
    this.skill = this.createBelongsToAccessorFor('skill', skillRepositoryGetter,);
    this.registerInclusionResolver('skill', this.skill.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
