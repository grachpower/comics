import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Md5 } from 'ts-md5/dist/md5';

import { HttpDataProvider } from '../http-data-provider/http-data-provider.service';
import { URL_PARAMS } from '../../config/url-params.config';
import { HttpRequestOptions } from '../http-data-provider/http-request-options.interface';

@Injectable()
export class HttpBaseRepository {
    private apiUrl: string = URL_PARAMS.MAIN;
    protected repositoryCache: Map<string, any> = new Map();

    constructor(
        private httpDataProvider: HttpDataProvider,
    ) {}

    protected get<T>(entityUrl: string, options?: HttpRequestOptions): Observable<T> {
        const reqHash = this.getHashRequest(entityUrl, options).toString();
        return this.repositoryCache.has(reqHash)
            ? Observable.of(this.repositoryCache.get(reqHash))
            : this.httpDataProvider.get<T>(this.apiUrl, entityUrl, options)
                .map(({data}: any) => data)
                .map(({results}: any) => results)
                .do((res: any) => this.repositoryCache.set(reqHash, res));
    }

    protected post<T>(entityUrl: string, options?: HttpRequestOptions, contentType?: string): Observable<T> {
        return this.httpDataProvider.post<T>(this.apiUrl, entityUrl, options, contentType);
    }

    protected patch<T>(entityUrl: string, options?: HttpRequestOptions, contentType?: string): Observable<T> {
        return this.httpDataProvider.patch<T>(this.apiUrl, entityUrl, options, contentType);
    }

    protected delete<T>(entityUrl: string, options?: HttpRequestOptions): Observable<T> {
        return this.httpDataProvider.delete<T>(this.apiUrl, entityUrl, options);
    }

    private getHashRequest(entityUrl: string, options?: HttpRequestOptions) {
        return Md5.hashStr(`${JSON.stringify(entityUrl)}${JSON.stringify(options)}`);
    }
}
