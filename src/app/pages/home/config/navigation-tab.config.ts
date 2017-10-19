import { NavigationTabModel } from '../models/navigation-tab.model';

export const tabIdParamName = 'tabId';

export class NAVIGATION_TABS {
    public static get DEFAULT(): NavigationTabModel[] {
        return [
            {route: '/comics', name: 'COMICS'},
            {route: '/heroes', name: 'HEROES'},
            {route: '/favourites', name: 'FAVOURITE'},
        ].map(navigationTabData => new NavigationTabModel(navigationTabData));
    }
}
