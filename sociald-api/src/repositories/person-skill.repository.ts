import {DefaultCrudRepository} from '@loopback/repository';
import {PersonSkill, PersonSkillRelations} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PersonSkillRepository extends DefaultCrudRepository<
  PersonSkill,
  typeof PersonSkill.prototype.id,
  PersonSkillRelations
> {
  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource,
  ) {
    super(PersonSkill, dataSource);
  }
}
