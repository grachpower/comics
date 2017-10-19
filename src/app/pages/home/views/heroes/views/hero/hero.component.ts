import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NavigationTabService } from '../../../../services/navigation-tab-service/navigation-tab.service';
import { HeroModel } from '../../models/hero.model';
import { HeroesRepository } from '../../../../../../services/heroes-repository/heroes.reporitory';
import { ComicModel } from '../../../comics/models/comic.model';
import { FavouritesService } from '../../../../../../services/favourites-service/favourites.service';

@Component({
    selector: 'app-hero',
    templateUrl: './hero.component.html',
    styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
    public hero: HeroModel;
    public comics: ComicModel[];
    public isFavourite: boolean = false;

    constructor(
        private heroesRepository: HeroesRepository,
        private route: ActivatedRoute,
        private router: Router,
        private tabsService: NavigationTabService,
        private favouritesService: FavouritesService,
    ) {}

    public ngOnInit(): void {
        this.loadHero()
            .subscribe(() => this.tabsService.updateCurrentTabName(this.hero.name));

        this.isFavourite = this.favouritesService.isFavourite(this.heroId, 'hero');

        this.router.events
            .switchMap(event => {
                if (event instanceof NavigationEnd) {
                    return this.loadHero();
                } else {
                    return Observable.of(this.hero);
                }
            })
            .subscribe();
    }

    public get heroId(): string {
        return this.route.snapshot.params['id'];
    }

    public loadHero(): Observable<any> {
        return this.heroesRepository.fetchHero(this.heroId)
            .switchMap((hero: HeroModel) => {
                this.hero = hero;

                return this.heroesRepository.fetchHeroComics(this.heroId);
            })
            .do((comics: ComicModel[]) => this.comics = comics);
    }

    public selectComic(comic: ComicModel): void {
        this.tabsService.openNewTab({route: `comics/entity/${comic.id}`, name: `${comic.title}`});
    }

    public toggleFavourite() {
        this.isFavourite = !this.isFavourite;
        this.favouritesService.toggleFavourite(this.heroId, 'hero');
    }
}
