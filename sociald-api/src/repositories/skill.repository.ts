import {DefaultCrudRepository} from '@loopback/repository';
import {Skill, SkillRelations} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SkillRepository extends DefaultCrudRepository<
  Skill,
  typeof Skill.prototype.id,
  SkillRelations
> {
  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource,
  ) {
    super(Skill, dataSource);
  }
}
