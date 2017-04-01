import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { CollapseModule } from 'ng2-bootstrap/collapse';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { RouteModule } from './route.module';
import {CarouselService} from "./carousel.service";



@NgModule({
  declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CollapseModule.forRoot(),
        RouteModule,
        FormsModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers: [
        CarouselService
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
