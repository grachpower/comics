import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes.routing';
import { HeroListComponent } from './views/hero-list/hero-list.component';
import { HeroComponent } from './views/hero/hero.component';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [
        HeroListComponent,
        HeroComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        HeroesRoutingModule,
    ],
})
export class HeroesModule {}
