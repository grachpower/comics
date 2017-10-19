import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DictionaryInterface } from '../../../../interfaces/dictionary.interface';
import { NavigationTabModel } from '../../models/navigation-tab.model';
import { NAVIGATION_TABS } from '../../config/navigation-tab.config';

export interface NavigationTabOptions {
    route: string;
    queryParams?: DictionaryInterface<any>;
    name?: string;
    parentRoute?: string;
}

@Injectable()
export class NavigationTabService {
    private _availableTabs: NavigationTabModel[] = NAVIGATION_TABS.DEFAULT;
    private _currentTab: BehaviorSubject<NavigationTabModel> = new BehaviorSubject(NAVIGATION_TABS.DEFAULT[0]);


    constructor(
        private router: Router,
    ) {
        this.onServiceInit();
    }

    public onServiceInit(): void {
        this.openTabIfNotExist({
            route: this.router.routerState.snapshot.url.split('?')[0],
        });
    }

    public get currentTab() {
        return this._currentTab.value;
    }

    public updateCurrentTab(tab: NavigationTabModel) {
        this._currentTab.next(tab);
    }

    public get availableTabs(): NavigationTabModel[] {
        return this._availableTabs;
    }

    private addTab(tabData: NavigationTabModel): NavigationTabModel[] {
        return this._availableTabs = [...this._availableTabs, tabData];
    }

    public findTabById(tabId: string): NavigationTabModel {
        return this._availableTabs.find(({id}: NavigationTabModel) => tabId === id);
    }

    public findTab(options: NavigationTabOptions): NavigationTabModel {
        return this.matchedTabs(options)[0];
    }

    private matchedTabs({route, queryParams, name, parentRoute}: NavigationTabOptions): NavigationTabModel[] {
        return this._availableTabs
            .filter((tab: NavigationTabModel) => tab.route === NavigationTabModel.basePathUrl(route))
            .filter((tab: NavigationTabModel) => !queryParams || tab.queryParams === queryParams)
            .filter((tab: NavigationTabModel) => !name || tab.name === name)
            .filter((tab: NavigationTabModel) => !parentRoute || tab.parentRoute === NavigationTabModel.basePathUrl(parentRoute));
    }

    public openNewTab({route, queryParams, name, parentRoute}: NavigationTabOptions): NavigationTabModel {
        const currentRoute = this.router.url.split('?')[0];
        const navTab: NavigationTabModel =
            new NavigationTabModel({name, route, parentRoute: parentRoute || currentRoute, queryParams});
        this.addTab(navTab);
        this.focusOnTabById(navTab.id);
        return navTab;
    }

    public openTabIfNotExist(options: NavigationTabOptions): NavigationTabModel {
        if (this.isTabExist(options)) {
            const tab = this.findTab(options);
            this.focusOnTabById(tab.id);
            return tab;
        } else {
            this.openNewTab(options);
        }
    }

    public isTabExist(options: NavigationTabOptions): boolean {
        return !!this.findTab(options);
    }

    private switchFocusToParentTab(tab: NavigationTabModel): void {
        const {id} = this.findTab({route: tab.parentRoute}) || this._availableTabs[0];
        this.focusOnTabById(id);
    }

    public rebootTabs(): void {
        this._availableTabs = NAVIGATION_TABS.DEFAULT;
        this.focusOnTabById(this._availableTabs[0].id);
    }

    public updateCurrentTabName(name: string): void {
        this.currentTab.name = name;
    }

    public updateTabName(tabId: string, name: string): void {
        const tab = this.findTabById(tabId);
        if (tab) {
            tab.name = name;
        }
    }

    public updateCurrentTabRoute(route: string): void {
        this.currentTab.route = route;
    }

    public updateTabRoute(tabId: string, route: string): void {
        const tab = this.findTabById(tabId);
        if (tab) {
            tab.route = route;
        }
    }

    public updateCurrentTabQueryParams(queryParams: DictionaryInterface<any>): void {
        this.currentTab.queryParams = queryParams;
    }

    public updateTabQueryParams(tabId: string, queryParams: DictionaryInterface<any>): void {
        const tab = this.findTabById(tabId);
        if (tab) {
            tab.queryParams = queryParams;
        }
    }

    public focusOnTabById(tabId: string): void {
        const tab = this.findTabById(tabId);
        this.updateCurrentTab(tab);
        this.router.navigate([tab.route], {queryParams: tab.queryParams});
    }

    public focusOnTab(options?: NavigationTabOptions): void {
        const tab = this.findTab(options || {} as NavigationTabModel);
        if (!tab) {
            console.error('Unexpected tab params: ' + JSON.stringify(options));
            return;
        }
        this.focusOnTabById(tab.id);
    }

    public removeTabById(tabId: string, redirectRoute?: string): void {
        const tab = this.findTabById(tabId);
        this._availableTabs = this._availableTabs.filter(({id}: NavigationTabModel) => id !== tabId);
        if (redirectRoute) {
            const redirectTab = this.findTab({route: redirectRoute});
            if (redirectTab) {
                return this.focusOnTabById(redirectTab.id);
            }
        }
        if (this.isActiveTab(tabId)) {
            this.switchFocusToParentTab(tab);
        }
    }

    public removeCurrentTab(redirectRoute?: string): void {
        this.removeTabById(this.currentTab.id, redirectRoute);
    }

    public isActiveTab(tabId: string): boolean {
        return this.currentTab.id === tabId;
    }

    public goBack(): void {
        this.switchFocusToParentTab(this.currentTab);
    }
}
