import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {CarouselService} from "./carousel/carousel.service";
import {OwlCarouselComponent} from "./carousel/owl-carousel.component";

import {AbstractMockObservableService} from "./abstract-mock-observable.service";
import {CarouselSlide} from "./carousel/carousel-slide";


describe("AppComponent", () => {
    let cmp:AppComponent;
    let fixture:ComponentFixture<AppComponent>;

    class MockService extends AbstractMockObservableService {
        public getSlidelList(){
            return this
        }
    }

    let mockService;
    beforeEach(async( () => {
        mockService = new MockService();

        TestBed.configureTestingModule({
            declarations: [ AppComponent, OwlCarouselComponent ],
            // providers: [ CarouselService ]
            providers: [{provide: CarouselService, useValue: mockService }],
        }).compileComponents();
    }))

    beforeEach(() => {
        let slides = [
            { id: 11, image: 'assets/image/slider/slider-1.jpg', link: '', title: 'New Season is here', description: 'Dont loose any episode of the new 4th Arrow season' },
            { id: 12, image: 'assets/image/slider/slider-2.jpg', link: '', title: 'New Season is here', description: 'Dont loose any episode of the new 4th Arrow season' },
            { id: 13, image: 'assets/image/slider/slider-3.jpg', link: '', title: 'New Season is here', description: 'Dont loose any episode of the new 4th Arrow season' },
        ];

        mockService.content = slides;
        fixture = TestBed.createComponent(AppComponent);
        cmp = fixture.componentInstance;
    })

    it("Should create AppComponent", () => {
        expect(cmp).toBeTruthy();
    })

    it('Should get slide data', () => {
        fixture.detectChanges();
        expect(cmp.carouselSlides).toBeTruthy();
    })
    it('Should get count of slides and equal to 3', ()=>{
        fixture.detectChanges();
        let count = cmp.carouselSlides.length;
        expect(count).toEqual(3);
    })
    it('Should have image property in slide', ()=>{
        fixture.detectChanges();
        let slide = cmp.carouselSlides[0];

        expect(slide.image).toBeDefined()
    })


})
