import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Image } from 'src/app/interfaces/image.interface';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {

  loadedImages: Image[] = []; // The images to be shown
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    public imageService: ImageService,
  ) { }

  ngOnInit() {
    this.loadMoreImages();
  }


  loadData(event): void {
    console.log('Loading images...');
    const finishedFlag: boolean = this.loadMoreImages();
    console.log(this.loadedImages);
    event.target.complete();

    if (finishedFlag) {
      event.target.disabled = true;
    }
  }


  private loadMoreImages(): boolean {
    const newImages = this.imageService.getNextImages();
    this.loadedImages = this.loadedImages.concat(newImages);

    return newImages.length === 0 ? true : false; // Return true if there are not more images
  }


  public filterImages(event: CustomEvent): void {
    this.loadedImages = [];
    this.imageService.filterImages(event.detail.value);
    this.loadMoreImages();
    this.infiniteScroll.disabled = false;
  }

}
