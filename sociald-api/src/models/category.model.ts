import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Publication} from './publication.model';
import {Area} from './area.model';

@model()
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  code: number;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  name: string;

  @belongsTo(() => Publication)
  publicationId: string;

  @belongsTo(() => Area)
  areaId: string;

  @hasMany(() => Publication)
  publications: Publication[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
