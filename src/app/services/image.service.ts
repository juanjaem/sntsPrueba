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
    this.inizalization();
  }


  // Initializes the data
  private inizalization(): void {
    this.imgArr = this.imageArrayGenerator();
    this.filteredImages = this.imgArr.slice();
  }


  // Generates a 4000 Image array
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


  // Generates a random name
  private generateRandomText(lengthOfCode: number = 10): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  // Search fuction
  public filterImages(search: string = ''): void {
    this.filteredImages = [];
    this.lastImage = 0;

    if (search === '') {
      // Nothing to search
      this.filteredImages = this.imgArr.slice();
      return;
    }

    const letters = [...search]; // letters to contain the strings

    // Filtering the images with a predictive search
    this.filteredImages = this.imgArr.filter( (image: Image) => {
      let lastPosition = 0;
      let test1: boolean = false;
      let test2: boolean = false;

      // Predictive search in 'text' field
      test1 = letters.every( x => {
        // return image.text.search(x) !== -1 ? true : false;
        const idx = image.text.indexOf(x, lastPosition);
        if (idx !== -1) {
          lastPosition = idx + 1;
          return true;
        } else {
          return false;
        }
      });

      if (!test1) {
        // Nothing found in 'text' field... let's try in 'id' field
        // Predictive search in 'id' field
        lastPosition = 0;
        test2 = letters.every( x => {
          // return image.text.search(x) !== -1 ? true : false;
          const idx = image.id.indexOf(x, lastPosition);
          if (idx !== -1) {
            lastPosition = idx + 1;
            return true;
          } else {
            return false;
          }
        });
      }

      return test1 || test2 ? true : false;
    });


    // ----- OLD FILTER, REPLACED FOR A PREDICTIVE ONE ----------------
    // this.filteredImages = this.imgArr.filter( (image: Image) => {
    //   if ( image.id.search(search) !== -1 || image.text.search(search) !== -1 ) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
    // ------------------------------------------------------------------
  }


  // Every time is called, return the next 10 images
  public getNextImages(): Image[] {
    if (this.lastImage > this.filteredImages.length - 1) {
      return [];
    }

    const from = this.lastImage;
    const to = this.lastImage + 40;
    this.lastImage = to;
    return this.filteredImages.slice(from, to);
  }

}
