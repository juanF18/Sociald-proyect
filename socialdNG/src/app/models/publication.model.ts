export class PublicationModel{
    id?:string;
    code: string;
    name: string;
    description:string;
    status: Boolean = false;
    publicationPicPath?:string;
}