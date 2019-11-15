export interface IImage {
  id?: number;
  imageContentType?: string;
  image?: any;
  imagePath?: string;
}

export class Image implements IImage {
  constructor(public id?: number, public imageContentType?: string, public image?: any, public imagePath?: string) {}
}
