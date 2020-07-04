import {DefaultCrudRepository} from '@loopback/repository';
import {PublicationRequest, PublicationRequestRelations} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicationRequestRepository extends DefaultCrudRepository<
  PublicationRequest,
  typeof PublicationRequest.prototype.id,
  PublicationRequestRelations
> {
  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource,
  ) {
    super(PublicationRequest, dataSource);
  }
}
