import { Injectable } from '@angular/core';

@Injectable()
export class FavouritesService {
    private readonly favouriteBaseElement: string = 'favourites';

    constructor() {
        this.initStoreOnLoad();
    }

    private initStoreOnLoad(): void {
        if (!localStorage.getItem(this.favouriteBaseElement)) {
            localStorage.setItem(this.favouriteBaseElement, JSON.stringify({}));
        }
    }

    public get favourites() {
        return JSON.parse(localStorage.getItem(this.favouriteBaseElement));
    }

    public addFavourite(id: string, type: string): void {
        const favourites = this.favourites;

        favourites[id] = type;

        localStorage.setItem(this.favouriteBaseElement, JSON.stringify(favourites));
    }

    public removeFavourite(id: string): void {
        const favourites = this.favourites;

        delete favourites[id];

        localStorage.setItem(this.favouriteBaseElement, JSON.stringify(favourites));
    }

    public toggleFavourite(id: string, type: string): void {
        const favourites = this.favourites;

        favourites.hasOwnProperty(id) ? this.removeFavourite(id) : this.addFavourite(id, type);
    }

    public isFavourite(id: string, type: string): boolean {
        const favourites = this.favourites;

        return favourites[id] === type;
    }
}
