import { Component, OnInit, Input,  ElementRef, ViewChild, HostBinding } from '@angular/core';
import {CarouselSlide} from "./carousel-slide";
// import {setTimeout, setInterval, clearInterval} from "timers";
// import { setInterval, clearInterval } from 'timer'


declare var $:any;
declare var owlCarousel:any;

@Component({
    selector: 'owl-carousel',
    template: `<ng-content class="skyplex-slider"></ng-content>`

})
export class OwlCarouselComponent {
    @HostBinding('class') defaultClass = 'owl-carousel owl-theme';
    @Input()
    public options: Object;

    @Input()
    public slides: CarouselSlide[];

    $owlElement:any;
    defaultOptions: Object = {};

    constructor(private elm: ElementRef) {

    }


    ngAfterViewInit(){


    }
    setup(){
        console.log('inited')
        for (var key in this.options) {
            this.defaultOptions[key] = this.options[key];
        }
        this.defaultOptions = {


            items : 1,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:false,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            },
            autoplay: true,
            autoplayTimeout: 3000, //Set AutoPlay to 3 seconds
            dots: true,
            smartSpeed: 600
        }



        console.log('owlCarousel')

        // this.$owlElement = $(this.crsl).owlCarousel(this.defaultOptions);
        // this.$owlElement = $(this.elm.nativeElement).owlCarousel();

        console.log('-------')
        console.log(this.slides)
        if(this.slides) this.$owlElement = $(this.elm.nativeElement).owlCarousel(this.defaultOptions);
    }
    ngDoCheck(){

    }
    ngOnChanges(){
        // this.ngOnDestroy();
        // this.setup();
        if(this.slides){
            setTimeout(()=>{
                this.ngOnDestroy();
                this.setup()
            }, 1000);
        }

    }
    ngOnDestroy(){
        if(this.$owlElement)  this.$owlElement.owlCarousel('destroy');
        this.$owlElement = null;
    }

}
