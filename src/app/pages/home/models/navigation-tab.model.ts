import { Model } from '../../../core/decorators/model.decorator';
import { DictionaryInterface } from '../../../core/interfaces/dictionary.interface';
import { NAVIGATION_TABS, tabIdParamName } from '../config/navigation-tab.config';
import { generateId } from '../../../core/helpers/generateId';

@Model()
export class NavigationTabModel {
    public static basePath = '/';

    public name: string = '';
    public id: string = generateId();

    private _route: string = NavigationTabModel.basePathUrl('');
    private _queryParams: DictionaryInterface<any> = {};
    private _parentRoute: string;


    public static basePathUrl = (incomingUrl: string): string => {
        return `${NavigationTabModel.basePath}${incomingUrl}`;
    }

    constructor(params?) {
        (<any>this).resolveParams(params);
    }

    public set route(value: string) {
        this._route = NavigationTabModel.basePathUrl(value);
    }

    public get route(): string {
        return this._route;
    }

    public set parentRoute(value: string) {
        this._parentRoute = NavigationTabModel.basePathUrl(value);
    }

    public get parentRoute(): string {
        return this._parentRoute;
    }

    public set queryParams(value: DictionaryInterface<any>) {
        this._queryParams = value || {};
        if (!this._queryParams[tabIdParamName]) {
            this._queryParams = {
                ...this._queryParams,
                [tabIdParamName]: this.id,
            };
        } else {
            this.id = this._queryParams[tabIdParamName];
        }
    }

    public get queryParams(): DictionaryInterface<any> {
        return this._queryParams;
    }

    public get isDefault(): boolean {
        const index = NAVIGATION_TABS.DEFAULT
            .findIndex((item) => item.name === this.name);
        return index === -1;
    }
}
