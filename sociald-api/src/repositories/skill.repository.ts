import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Skill, SkillRelations, PersonSkill} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonSkillRepository} from './person-skill.repository';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id,
  SkillRelations
> {

  public readonly personSkills: HasManyRepositoryFactory<PersonSkill, typeof Skill.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('PersonSkillRepository') protected personSkillRepositoryGetter: Getter<PersonSkillRepository>,
  ) {
    super(Skill, dataSource);
    this.personSkills = this.createHasManyRepositoryFactoryFor('personSkills', personSkillRepositoryGetter,);
    this.registerInclusionResolver('personSkills', this.personSkills.inclusionResolver);
  }
}
