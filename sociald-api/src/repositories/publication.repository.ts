import {DefaultCrudRepository} from '@loopback/repository';
import {Publication, PublicationRelations} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicationRepository extends DefaultCrudRepository<
  Publication,
  typeof Publication.prototype.id,
  PublicationRelations
> {
  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource,
  ) {
    super(Publication, dataSource);
  }
}
