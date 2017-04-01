import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map' ;
import 'rxjs/add/operator/catch' ;

import { CarouselSlide } from './carousel-slide';

@Injectable()
export class CarouselService {
    private api = 'api';
    constructor(private http: Http) {}
    getSlidelList(): Observable<CarouselSlide[]> {
        const url = this.api + '/carouselSlides';
        return this.http.get(url)
            .map((res: Response) => res.json().data as CarouselSlide[])
            .catch((error: any) => Observable.throw(error.json().error || 'Server error')) ;
    }
}
