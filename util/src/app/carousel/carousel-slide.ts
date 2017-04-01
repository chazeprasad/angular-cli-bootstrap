export class CarouselSlide {
  public image: string;
  public link: string;
  public title: string;
  public description: string;
  constructor(image: string, link: string, title: string, description: string) {
    this.image        = image;
    this.link         = link;
    this.title        = title;
    this.description  = description;
  }
}
