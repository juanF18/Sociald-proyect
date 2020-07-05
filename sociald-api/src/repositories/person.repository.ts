import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {Person, PersonRelations, User, PersonSkill, Publication} from '../models';
import {MongoAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserRepository} from './user.repository';
import {PersonSkillRepository} from './person-skill.repository';
import {PublicationRepository} from './publication.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly user: HasOneRepositoryFactory<User, typeof Person.prototype.id>;

  public readonly personSkills: HasManyRepositoryFactory<PersonSkill, typeof Person.prototype.id>;

  public readonly publications: HasManyRepositoryFactory<Publication, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongoAtlas') dataSource: MongoAtlasDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('PersonSkillRepository') protected personSkillRepositoryGetter: Getter<PersonSkillRepository>, @repository.getter('PublicationRepository') protected publicationRepositoryGetter: Getter<PublicationRepository>,
  ) {
    super(Person, dataSource);
    this.publications = this.createHasManyRepositoryFactoryFor('publications', publicationRepositoryGetter,);
    this.registerInclusionResolver('publications', this.publications.inclusionResolver);
    this.personSkills = this.createHasManyRepositoryFactoryFor('personSkills', personSkillRepositoryGetter,);
    this.registerInclusionResolver('personSkills', this.personSkills.inclusionResolver);
    this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
