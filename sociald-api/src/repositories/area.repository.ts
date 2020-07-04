import {DefaultCrudRepository} from '@loopback/repository';
import {Area, AreaRelations} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AreaRepository extends DefaultCrudRepository<
  Area,
  typeof Area.prototype.id,
  AreaRelations
> {
  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource,
  ) {
    super(Area, dataSource);
  }
}
