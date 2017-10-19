import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpBaseRepository } from '../http-base-repository/http-base-repository.service';
import { HttpRequestOptions } from '../http-data-provider/http-request-options.interface';
import { HeroModel } from '../../pages/home/views/heroes/models/hero.model';
import { ComicModel } from '../../pages/home/views/comics/models/comic.model';

@Injectable()
export class HeroesRepository extends HttpBaseRepository {
    private entityUrl = 'characters';

    public fetchHeroes(options?: HttpRequestOptions): Observable<HeroModel[]> {
        return this.get(this.entityUrl, options);
    }

    public fetchHero(id: string, options?: HttpRequestOptions): Observable<HeroModel> {
        return this.get(`${this.entityUrl}/${id}`, options)
            .map((results: any) => new HeroModel(results[0]));
    }

    public fetchHeroComics(id: string, options?: HttpRequestOptions): Observable<ComicModel[]> {
        return this.get(`${this.entityUrl}/${id}/comics`, options)
            .map((results: any) => results.map(val => new ComicModel(val)));
    }

    public findHeroes(searchValue: string): Observable<HeroModel[]> {
        return this.get(this.entityUrl, {params: {nameStartsWith: searchValue}})
            .map((results: any) => results.map(hero => new HeroModel(hero)));
    }
}
