import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpBaseRepository } from '../http-base-repository/http-base-repository.service';
import { ComicModel } from '../../pages/home/views/comics/models/comic.model';
import { HttpRequestOptions } from '../http-data-provider/http-request-options.interface';
import { HeroModel } from '../../pages/home/views/heroes/models/hero.model';

@Injectable()
export class ComicsRepository extends HttpBaseRepository {
    private entityUrl = 'comics';

    public fetchComics(options?: HttpRequestOptions): Observable<ComicModel[]> {
        return this.get(this.entityUrl, options)
            .map((results: any) => results.map(comic => new ComicModel(comic)));
    }

    public fetchComic(id: string, options?: HttpRequestOptions): Observable<ComicModel> {
        return this.get(`${this.entityUrl}/${id}`, options)
            .map((results: any) => new ComicModel(results[0]));
    }

    public fetchComicHeroes(id: string, options?: HttpRequestOptions): Observable<HeroModel[]> {
        return this.get(`${this.entityUrl}/${id}/characters`, options)
            .map((results: any) => results.map(val => new HeroModel(val)));
    }

    public findComic(searchValue: string): Observable<ComicModel[]> {
        return this.get(this.entityUrl, {params: {titleStartsWith: searchValue}})
            .map((results: any) => results.map(comic => new ComicModel(comic)));
    }
}
