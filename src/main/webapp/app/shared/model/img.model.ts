export interface IImg {
  id?: number;
  title?: string;
  content?: string;
  writer?: string;
  date?: string;
  image_path?: string;
  imageContentType?: string;
  image?: any;
  imageName?: string;
}

export class Img implements IImg {
  constructor(
    public id?: number,
    public title?: string,
    public content?: string,
    public writer?: string,
    public date?: string,
    public image_path?: string,
    public imageContentType?: string,
    public image?: any,
    public imageName?: string
  ) {}
}
