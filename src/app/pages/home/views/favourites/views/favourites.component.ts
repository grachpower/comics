import { Component, OnInit } from '@angular/core';

import { HeroModel } from '../../heroes/models/hero.model';
import { ComicModel } from '../../comics/models/comic.model';
import { FavouritesService } from '../../../../../services/favourites-service/favourites.service';
import { ComicsRepository } from '../../../../../services/comics-repository/comics.repository';
import { HeroesRepository } from '../../../../../services/heroes-repository/heroes.reporitory';
import { DictionaryInterface } from '../../../../../core/interfaces/dictionary.interface';
import { FAVOURITES_CONFIG } from '../config/favourites.config';
import { NavigationTabService } from '../../../services/navigation-tab-service/navigation-tab.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
    public heroes: HeroModel[] = [];
    public comics: ComicModel[] = [];

    constructor(
        private favouritesService: FavouritesService,
        private comicsRepository: ComicsRepository,
        private heroesRepository: HeroesRepository,
        private tabsService: NavigationTabService,
    ) {}

    public ngOnInit(): void {
        this.loadFavourites();
    }

    private loadFavourites(): void {
        const favourites: DictionaryInterface<string> = this.favouritesService.favourites;

        Object.keys(favourites)
            .forEach((id: string) => {
                switch (favourites[id]) {
                    case FAVOURITES_CONFIG.TYPES.comic:
                        this.comicsRepository.fetchComic(id)
                            .subscribe((comic: ComicModel) => this.comics.push(comic));
                        break;
                    case FAVOURITES_CONFIG.TYPES.hero:
                        this.heroesRepository.fetchHero(id)
                            .subscribe((hero: HeroModel) => this.heroes.push(hero));
                        break;
                }
            });
    }

    public selectHero(hero: HeroModel): void {
        this.tabsService.openNewTab({route: `heroes/entity/${hero.id}`, name: `${hero.name}`});
    }

    public selectComic(comic: ComicModel): void {
        this.tabsService.openNewTab({route: `comics/entity/${comic.id}`, name: `${comic.title}`});
    }
}
