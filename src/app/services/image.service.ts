import { Injectable } from '@angular/core';
import { Image } from '../interfaces/image.interface';



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imgArr: Image[] = [];
  private lastImage: number = 0;

  constructor() {
    this.imgArr = this.imageArrayGenerator();
    console.log(this.imgArr);
  }


  private imageArrayGenerator(): Image[] {
    const imgArr: Image[] = [];

    for (let i = 1; i <= 4000; i++) {
      const imgElem: Image  = {
        id: i.toString(),
        photo: `https://picsum.photos/id/${i}/500/500`,
        text: this.generateRandomText()
      };
      imgArr.push(imgElem);
    }

    return imgArr;
  }


  private generateRandomText(lengthOfCode: number = 10): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  public getNextImages(): Image[] {
    if (this.lastImage >= this.imgArr.length - 1) {
      return [];
    }
    const from = this.lastImage;
    const to = this.lastImage + 10;
    this.lastImage = to;
    return this.imgArr.slice(from, to);
  }

}
