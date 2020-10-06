import { Injectable } from '@angular/core';
import { Image } from '../interfaces/image.interface';



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imgArr: Image[] = [];

  constructor() {
    this.imgArr = this.imageArrayGenerator();
    console.log(this.imgArr);
  }


  imageArrayGenerator(): Image[] {
    const imgArr: Image[] = [];

    for (let i = 1; i <= 4000; i++) {
      const imgElem: Image  = {
        id: i.toString(),
        photo: `https://i.picsum.photos/id/${i}/500/500`,
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

}
