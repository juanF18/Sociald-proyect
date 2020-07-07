import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongoAtlas',
  connector: 'mongodb',
  url:
    'mongodb+srv://dbAdmin:RkQtw1qY1GzCjNpI@ucaldascluster.g2knh.mongodb.net/sociald?retryWrites=true&w=majority',
  host: 'ucaldascluster.g2knh.mongodb.net',
  port: 27017,
  user: 'dbAdmin',
  password: 'RkQtw1qY1GzCjNpI',
  database: 'sociald',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoAtlasDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoAtlas';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoAtlas', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
