import { Injectable } from '@angular/core';
import { Image } from '../interfaces/image.interface';



@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private imgArr: Image[] = [];         // All the images
  private filteredImages: Image[] = []; // Only the searched images
  private lastImage: number = 0;        // Pagination position

  constructor() {
    this.imgArr = this.imageArrayGenerator();
    this.filteredImages = this.imgArr.slice();
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


  filterImages(search: string = '') {
    this.filteredImages = [];
    this.lastImage = 0;
    this.filteredImages = this.imgArr.filter( (image: Image) => {
      if ( image.id.search(search) !== -1 || image.text.search(search) !== -1 ) {
        return true;
      } else {
        return false;
      }
    });
  }


  public getNextImages(): Image[] {
    if (this.lastImage > this.filteredImages.length - 1) {
      return [];
    }

    const from = this.lastImage;
    const to = this.lastImage + 10;
    this.lastImage = to;
    return this.filteredImages.slice(from, to);
  }

}
