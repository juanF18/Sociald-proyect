import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Person, PersonRelations, User} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly user: HasOneRepositoryFactory<User, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Person, dataSource);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
