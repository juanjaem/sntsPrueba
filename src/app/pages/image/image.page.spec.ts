import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Image } from 'src/app/interfaces/image.interface';
import { ImageService } from 'src/app/services/image.service';
import { By } from '@angular/platform-browser';
import { ImagePage } from './image.page';
import { DebugElement, Input } from '@angular/core';

describe('ImagePage', () => {
  let component: ImagePage;
  let fixture: ComponentFixture<ImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePage ],
      imports: [IonicModule],
      providers: [ImageService]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('"loadMoreImages" should load images into "loadedImages"', () => {
    const fakeData: Image[] = [
      {id: '1', photo: 'fakeUrl', text: 'ASDFG'}
    ];

    const mockImageService = TestBed.inject(ImageService);
    mockImageService.getNextImages = jasmine.createSpy().and.returnValue(fakeData);

    // tslint:disable-next-line: no-string-literal
    component['loadMoreImages'](); // Acces via literal in order to access private method
    expect(component.loadedImages.pop()).toEqual(fakeData[0]);
  });


  it('"filterImages(1000)" should place only one result', () => {
    const mockData: any =  {detail: {value: '1000'}};
    component.filterImages(mockData);
    expect(component.loadedImages.length).toEqual(1);
  });


  it('a message should be shown if there are not result', () => {
    component.loadedImages = [];
    fixture.detectChanges();

    const elem: DebugElement = fixture.debugElement.query(By.css('h1'));
    expect(elem).not.toBeNull();
  });


  it('No message should be shown if there are results', () => {
    const elem: DebugElement = fixture.debugElement.query(By.css('h1'));

    expect(elem).toBeNull();
  });


});
