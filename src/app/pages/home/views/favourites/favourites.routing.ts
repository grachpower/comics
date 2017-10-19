import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavouritesComponent } from './views/favourites.component';

const ROUTES: Routes = [
    {path: '', component: FavouritesComponent},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class FavouritesRoutingModule {}
