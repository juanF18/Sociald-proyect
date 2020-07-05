import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Company, CompanyRelations, User, PublicationRequest} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {PublicationRequestRepository} from './publication-request.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly user: HasOneRepositoryFactory<User, typeof Company.prototype.id>;

  public readonly publicationRequests: HasManyRepositoryFactory<PublicationRequest, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PublicationRequestRepository') protected publicationRequestRepositoryGetter: Getter<PublicationRequestRepository>,
  ) {
    super(Company, dataSource);
    this.publicationRequests = this.createHasManyRepositoryFactoryFor('publicationRequests', publicationRequestRepositoryGetter,);
    this.registerInclusionResolver('publicationRequests', this.publicationRequests.inclusionResolver);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
