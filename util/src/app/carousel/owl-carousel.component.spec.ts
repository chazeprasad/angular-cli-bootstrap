import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import { DebugElement } from "@angular/core";

import { OwlCarouselComponent } from './owl-carousel.component';



describe('OwlCarouselComponent', () => {
    let cmp: OwlCarouselComponent;
    let fixture: ComponentFixture<OwlCarouselComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ OwlCarouselComponent ]
        }).compileComponents();
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(OwlCarouselComponent);
        cmp = fixture.componentInstance;

    })

    it('Should create component', () =>{
        expect(cmp).toBeTruthy();
    })
})



