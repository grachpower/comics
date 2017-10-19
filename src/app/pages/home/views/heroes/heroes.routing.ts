import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroComponent } from './views/hero/hero.component';
import { HeroListComponent } from './views/hero-list/hero-list.component';

const ROUTES: Routes = [
    {path: '', component: HeroListComponent},
    {path: 'entity/:id', component: HeroComponent},
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class HeroesRoutingModule {}
