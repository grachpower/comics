import { Component, OnInit } from '@angular/core';

import { NavigationTabService } from './services/navigation-tab-service/navigation-tab.service';
import { NavigationTabModel } from './models/navigation-tab.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    constructor(
        private navigationTabService: NavigationTabService,
    ) {}

    public ngOnInit(): void {
    }

    public get tabService() {
        return this.navigationTabService;
    }

    public closeTab(tab: NavigationTabModel): void {
        this.navigationTabService.removeTabById(tab.id);
    }
}
