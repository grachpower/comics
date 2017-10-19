import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ComicsRepository } from '../../../../../../services/comics-repository/comics.repository';
import { ComicModel } from '../../models/comic.model';
import { NavigationTabService } from '../../../../services/navigation-tab-service/navigation-tab.service';
import { HeroModel } from '../../../heroes/models/hero.model';
import { FavouritesService } from '../../../../../../services/favourites-service/favourites.service';

@Component({
    selector: 'app-comic',
    templateUrl: './comic.component.html',
    styleUrls: ['./comic.component.scss'],
})
export class ComicComponent implements OnInit {
    public comic: ComicModel;
    public heroes: HeroModel[];
    public isFavourite: boolean = false;

    constructor(
        private comicRepository: ComicsRepository,
        private route: ActivatedRoute,
        private router: Router,
        private tabsService: NavigationTabService,
        private favouritesService: FavouritesService,
    ) {}

    public ngOnInit(): void {
        this.loadComic()
            .subscribe(() => this.tabsService.updateCurrentTabName(this.comic.title));

        this.isFavourite = this.favouritesService.isFavourite(this.comicId, 'comic');

        this.router.events
            .switchMap(event => {
                if (event instanceof NavigationEnd) {
                    return this.loadComic();
                } else {
                    return Observable.of(this.comic);
                }
            })
            .subscribe();
    }

    public get comicId(): string {
        return this.route.snapshot.params['id'];
    }

    public loadComic(): Observable<any> {
        return this.comicRepository.fetchComic(this.comicId)
            .switchMap((comic: ComicModel) => {
                this.comic = comic;

                return this.comicRepository.fetchComicHeroes(this.comicId);
            })
            .do((heroes: HeroModel[]) => this.heroes = heroes);
    }

    public selectHero(hero: HeroModel): void {
        this.tabsService.openNewTab({route: `heroes/entity/${hero.id}`, name: `${hero.name}`});
    }

    public toggleFavourite() {
        this.isFavourite = !this.isFavourite;
        this.favouritesService.toggleFavourite(this.comicId, 'comic');
    }
}
