import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PublicationRequest, PublicationRequestRelations, Company, Publication} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CompanyRepository} from './company.repository';
import {PublicationRepository} from './publication.repository';

export class PublicationRequestRepository extends DefaultCrudRepository<
  PublicationRequest,
  typeof PublicationRequest.prototype.id,
  PublicationRequestRelations
> {

  public readonly company: BelongsToAccessor<Company, typeof PublicationRequest.prototype.id>;

  public readonly publication: BelongsToAccessor<Publication, typeof PublicationRequest.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>,
  ) {
    super(PublicationRequest, dataSource);
    this.publication = this.createBelongsToAccessorFor('publication', publicationRepositoryGetter,);
    this.registerInclusionResolver('publication', this.publication.inclusionResolver);
    this.company = this.createBelongsToAccessorFor('company', companyRepositoryGetter,);
    this.registerInclusionResolver('company', this.company.inclusionResolver);
  }
}
