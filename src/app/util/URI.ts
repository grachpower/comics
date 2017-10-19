import { stringify, parse, IParseOptions } from 'qs';

declare global {
    interface Object {
        toURI(data: any): string;
    }
    interface String {
        fromURI(): any;
    }
}

export function encodeData(data: any): string {
    return stringify(data);
}

export function decodeData(options?: IParseOptions): any {
    return parse(this, options);
}

Object.toURI = encodeData;

String.prototype.fromURI = decodeData;
