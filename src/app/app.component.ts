import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import {CarouselService} from './carousel.service';
import {CarouselSlide} from './carousel-slide';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
    public router:Router;

    public carouselSlides: CarouselSlide[];
    constructor(_router:Router, private carouselService: CarouselService) {
        this.router = _router;
    }

    public menuIndex:number = 2;
    public isCollapsed:boolean = true;

    public collapsed(evt:any):void {
        console.log(evt)
    }

    public expanded(evt: any): void {
        console.log(evt);
    }


    public onMenuItemClick(index: number, e:any): void {
        e.preventDefault();

        this.menuIndex = index
        this.isCollapsed = true;
        if(index == 0) this.router.navigate(['/login']);
        if(index == 1) this.router.navigate(['/signup']);

        //  this.router.navigate(['/hero', hero.id]);

    }

    ngOnInit () {
        console.log("App Init")
        this.carouselService.getSlidelList().subscribe(slides => {
                this.carouselSlides = slides;
                console.log(slides);
            },
            err => {
                console.log(err);
            }
        )
    }
}
