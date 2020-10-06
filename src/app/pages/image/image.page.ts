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


  // Infinite scroll use it to load images dynamically
  public loadData(event): void {
    console.log('Loading images...');
    const finishedFlag: boolean = this.loadMoreImages();
    console.log(this.loadedImages);
    event.target.complete();

    if (finishedFlag) {
      event.target.disabled = true;
    }
  }


  // Every time this funtion is called, will load a few images into 'loadedImages'.
  private loadMoreImages(): boolean {
    const newImages = this.imageService.getNextImages();
    this.loadedImages = this.loadedImages.concat(newImages);

    return newImages.length === 0 ? true : false; // Return true if there are not more images
  }


  // New search process
  public filterImages(event: CustomEvent): void {
    this.loadedImages = [];
    this.imageService.filterImages(event.detail.value);
    this.loadMoreImages();
    this.infiniteScroll.disabled = false;
  }

}
