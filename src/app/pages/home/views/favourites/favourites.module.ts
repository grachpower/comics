import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavouritesComponent } from './views/favourites.component';
import { FavouritesRoutingModule } from './favourites.routing';

@NgModule({
    declarations: [
        FavouritesComponent
    ],
    imports: [
        FavouritesRoutingModule,
        CommonModule
    ],
})
export class FavouritesModule {}
