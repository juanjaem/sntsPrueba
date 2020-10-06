import { TestBed } from '@angular/core/testing';
import { Image } from '../interfaces/image.interface';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('"imageArrayGenerator" sholud create an array with 4000 items of Image type', () => {
    // tslint:disable-next-line: no-string-literal
    const array = service['imageArrayGenerator']();
    expect(array.length).toEqual(4000);
    expect( Object.keys(array[0]) ).toContain('id');
    expect( Object.keys(array[0]) ).toContain('photo');
    expect( Object.keys(array[0]) ).toContain('text');
  });


  it('"generateRandomText" should generate a random string', () => {
    // tslint:disable-next-line: no-string-literal
    const str = service['generateRandomText']();
    expect(typeof str).toContain('string');
  });


  it('"filterImages(1000)" should find only one result', () => {
    const resp = service.filterImages('1000');
    // tslint:disable-next-line: no-string-literal
    expect(service['filteredImages'].length).toEqual(1);
  });


  it('"getNextImages" should return an array of images', () => {
    const imageArray = service.getNextImages();
    expect(imageArray.length).toBeGreaterThanOrEqual(1);
    expect( Object.keys(imageArray[0]) ).toContain('id');
    expect( Object.keys(imageArray[0]) ).toContain('photo');
    expect( Object.keys(imageArray[0]) ).toContain('text');
  });



});
