import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Publication, PublicationRelations, Person, PublicationRequest, Category} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonRepository} from './person.repository';
import {PublicationRequestRepository} from './publication-request.repository';
import {CategoryRepository} from './category.repository';

export class PublicationRepository extends DefaultCrudRepository<
  Publication,
  typeof Publication.prototype.id,
  PublicationRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof Publication.prototype.id>;

  public readonly category: BelongsToAccessor<Category, typeof Publication.prototype.id>;

  public readonly publicationRequests: HasManyRepositoryFactory<PublicationRequest, typeof Publication.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource,
    @repository.getter('PersonRepository')
    protected personRepositoryGetter: Getter<PersonRepository>,
    @repository.getter('PublicationRequestRepository')
    protected publicationRequestRepositoryGetter: Getter<PublicationRequestRepository>,
    @repository.getter('CategoryRepository')
    protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Publication, dataSource);
    this.publicationRequests = this.createHasManyRepositoryFactoryFor('publicationRequests', publicationRequestRepositoryGetter,);
    this.registerInclusionResolver('publicationRequests', this.publicationRequests.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
