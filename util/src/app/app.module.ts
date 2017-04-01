import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


import { AppComponent } from './app.component';
import { OwlCarouselComponent } from './carousel/owl-carousel.component';
import {CarouselService} from './carousel/carousel.service';

@NgModule({
    declarations: [
        AppComponent,
        OwlCarouselComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),

    ],
    providers: [
        CarouselService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
