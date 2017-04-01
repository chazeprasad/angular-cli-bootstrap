import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const carouselSlides = [
            { id: 11, image: 'assets/image/slider/slider-1.jpg', link: '', title: 'New Season is here', description: 'Dont loose any episode of the new 4th Arrow season' },
            { id: 12, image: 'assets/image/slider/slider-2.jpg', link: '', title: 'New Season is here', description: 'Dont loose any episode of the new 4th Arrow season' },
            { id: 13, image: 'assets/image/slider/slider-3.jpg', link: '', title: 'New Season is here', description: 'Dont loose any episode of the new 4th Arrow season' },
        ];

        return { carouselSlides } ;
    }
}
