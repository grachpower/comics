import { Model } from '../../../../../core/decorators/model.decorator';

@Model()
export class HeroModel {
    public id: number;
    public name: string;
    public description: string;
    public thumbnail: {path: string, extension: string};
    public comics: {items: {resourceURI: string, name: string}};

    constructor(params?) {
        (<any>this).resolveParams(params);
    }
}
