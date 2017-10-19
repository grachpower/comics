import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', redirectTo: 'comics'},
            {path: 'comics', loadChildren: './views/comics/comics.module#ComicsModule'},
            {path: 'heroes', loadChildren: './views/heroes/heroes.module#HeroesModule'},
            {path: 'favourites', loadChildren: './views/favourites/favourites.module#FavouritesModule'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
