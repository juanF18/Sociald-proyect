import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Category, CategoryRelations, Publication, Area} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicationRepository} from './publication.repository';
import {AreaRepository} from './area.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly publication: BelongsToAccessor<Publication, typeof Category.prototype.id>;

  public readonly area: BelongsToAccessor<Area, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>, @repository.getter('AreaRepository') protected areaRepositoryGetter: Getter<AreaRepository>,
  ) {
    super(Category, dataSource);
    this.area = this.createBelongsToAccessorFor('area', areaRepositoryGetter,);
    this.registerInclusionResolver('area', this.area.inclusionResolver);
    this.publication = this.createBelongsToAccessorFor('publication', publicationRepositoryGetter,);
    this.registerInclusionResolver('publication', this.publication.inclusionResolver);
  }
}
