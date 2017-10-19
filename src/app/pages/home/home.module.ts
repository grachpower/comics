import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { NavigationTabService } from './services/navigation-tab-service/navigation-tab.service';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        HomeRoutingModule,
        CommonModule,
    ],
    providers: [
        NavigationTabService,
    ]
})
export class HomeModule { }
