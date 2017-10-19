import { Model } from '../../../../../decorators/model.decorator';
import { DictionaryInterface } from '../../../../../interfaces/dictionary.interface';

@Model()
export class ComicModel {
    public id: number;
    public title: string;
    public description: string;
    public characters: {items: {resourceURI: string, name: string}[]};
    public creators: {items: {resourceURI: string, name: string}[]};
    public images: string[];
    public pageCount: number;
    public resouceURI: string;
    public series: DictionaryInterface<string>;
    public thumbnail: {path: string, extension: string};

    constructor(params?) {
        (<any>this).resolveParams(params);
    }
}
