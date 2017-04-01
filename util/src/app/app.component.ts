import {Component, OnInit} from '@angular/core';
import {CarouselService} from "./carousel/carousel.service";
import {CarouselSlide} from "./carousel/carousel-slide";


declare var $: any;

@Component({
    selector: 'app-root',

    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'app works!';
    public carouselSlides: CarouselSlide[];
    constructor( private carouselService: CarouselService ) {}

    ngOnInit(){
        this.carouselService.getSlidelList().subscribe(slides => {
                this.carouselSlides = slides;
            },
            err => {
                console.log(err);
            }
        )
    }
    showVideo(slide: CarouselSlide): void {

    }
}
