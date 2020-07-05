import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Area, AreaRelations, Category} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CategoryRepository} from './category.repository';

export class AreaRepository extends DefaultCrudRepository<
  Area,
  typeof Area.prototype.id,
  AreaRelations
> {

  public readonly categories: HasManyRepositoryFactory<Category, typeof Area.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(Area, dataSource);
    this.categories = this.createHasManyRepositoryFactoryFor('categories', categoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
