import { environment } from "../../environments/environment";
import { CloudinaryConfiguration } from '@cloudinary/angular-5.x';


export namespace cloud {
    export const CLOUD_NAME = environment.CLOUD_NAME;
    export const UPLOAD_PRESET = environment.UPLOAD_PRESET
    export const config: CloudinaryConfiguration ={
        cloud_name:CLOUD_NAME,
        upload_preset:UPLOAD_PRESET,
      } 
} 