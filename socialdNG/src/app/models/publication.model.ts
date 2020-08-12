import {CategoryModel} from './category.model';

export class PublicationModel{
    id?:string;
    code?: string;
    name: string;
    description:string;
    status: boolean = false;
    publicationPicPath?:string;
    categoryId?: string;
    category?: object;
}
