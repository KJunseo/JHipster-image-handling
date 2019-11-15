export interface IUploadImage {
  id?: number;
  imageName?: string;
  imagePath?: string;
  imageContentType?: string;
  image?: any;
}

export class UploadImage implements IUploadImage {
  constructor(
    public id?: number,
    public imageName?: string,
    public imagePath?: string,
    public imageContentType?: string,
    public image?: any
  ) {}
}
