import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  juggler,
  repository,
  BelongsToAccessor,
} from '@loopback/repository';
import {UserServiceBindings} from '../keys';
import {User, UserCredentials, UserRelations, Person, Company} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import { PersonRepository } from './person.repository';
import { CompanyRepository } from './company.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;
  public readonly person: BelongsToAccessor<
    Person,
    typeof User.prototype.id
  >;
  public readonly company: BelongsToAccessor<
    Company,
    typeof User.prototype.id
  >;

  constructor(
    @inject(`datasources.${UserServiceBindings.DATASOURCE_NAME}`)
    dataSource: juggler.DataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<
      UserCredentialsRepository
    >,
    @repository.getter('PersonRepository')
    protected personRepositoryGetter: Getter<
      PersonRepository
    >,
    @repository.getter('CompanyRepository')
    protected companyRepositoryGetter: Getter<
      CompanyRepository
    >,
  ) {
    super(User, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
    this.person = this.createBelongsToAccessorFor(
      'person',
      personRepositoryGetter,
    );
    this.registerInclusionResolver(
      'person',
      this.person.inclusionResolver,
    );
    this.company = this.createBelongsToAccessorFor(
      'company',
      companyRepositoryGetter,
    );
    this.registerInclusionResolver(
      'company',
      this.company.inclusionResolver,
    );
  }

  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }

  async getData(
    userId: typeof User.prototype.id,
    role: typeof User.prototype.role,
  ): Promise <Person | Company | undefined> {
    try{
      if(role == "person"){
        return await this.person(userId);
      }else{
        return await this.company(userId);
      }
    }catch (err){
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }

      throw err;
    }
  }
}
