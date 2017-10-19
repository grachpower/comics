import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Md5 } from 'ts-md5/dist/md5';

import { HttpRequestOptions } from 'src/app/services/http-data-provider/http-request-options.interface';
import { CONTENT_TYPE } from '../../../../config/content-type.constants';
import { ErrorHandlerService } from '../error-handler/error-handler.service';
import { PRIVATE_KEY, PUBLIC_KEY } from '../../../../config/api-keys.config';
import { DictionaryInterface } from '../../interfaces/dictionary.interface';

export function getHashValue(timestamp: string) {
    return Md5.hashStr(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`.toString());
}

export function getAdditionalParams() {
    const timestamp: string = new Date().toDateString();

    return {
      ts: timestamp,
      apikey: PUBLIC_KEY,
      hash: getHashValue(timestamp),
    };
}

export function SetHeaders(targetClass: any, methodName: string, descriptor: TypedPropertyDescriptor<any>): any {
    return {
        value(apiUrl: string, entityUrl: string, options?: HttpRequestOptions, contentType?: string) {
            if (!options) {
                options = {};
            }
            let headers = new HttpHeaders();
            let params = new HttpParams();
            let body = options.body;

            const additionalParams: DictionaryInterface<any> = getAdditionalParams();

            if (options.params) {
                Object.keys(options.params)
                    .filter((key: string) => options.params[key] || options.params[key] === 0)
                    .forEach((key: string) => params = params.append(key, options.params[key]));
            }

            if (additionalParams) {
                Object.keys(additionalParams)
                    .filter((key: string) => additionalParams[key] || additionalParams[key] === 0)
                    .forEach((key: string) => params = params.append(key, additionalParams[key]));
            }

            // prepare body and headers if it's necessary
            if (contentType) {
                const type: string = contentType.toUpperCase();
                headers = headers.set('Content-Type', CONTENT_TYPE[type]);

                switch (contentType) {
                    case CONTENT_TYPE.FORM_TYPE:
                        body = Object.toURI(body);
                        break;
                    case CONTENT_TYPE.JSON_TYPE:
                        body = JSON.stringify(body);
                        break;
                    case CONTENT_TYPE.TEXT_TYPE:
                        body = body.toString();
                        break;
                }
            }

            options = Object.assign(options, {body, params, headers});

            return descriptor.value.call(this, apiUrl, entityUrl, options, contentType);
        }
    };
}

@Injectable()
export class HttpDataProvider {
    constructor(
        private http: HttpClient,
        private errorHandler: ErrorHandlerService,
    ) {}

    private requestHandler(source: Observable<any>, retryDelay: number = 1000): Observable<any> {
        return source
            .retryWhen((errors) => errors.delay(retryDelay).switchMap(_errors => Observable.throw(_errors)))
            .catch((err: any) => this.errorHandler.handleError(err));
    }

    @SetHeaders
    public get<T>(baseUrl: string, entityUrl: string, options?: HttpRequestOptions): Observable<T> {
        const source = this.http.get<T>(`${baseUrl}${entityUrl}`, options);

        return this.requestHandler(source);
    }

    @SetHeaders
    public post<T>(baseUrl: string, entityUrl: string, options?: HttpRequestOptions, contentType: string = CONTENT_TYPE.JSON_TYPE): Observable<T> {
        const source = this.http.post<T>(`${baseUrl}${entityUrl}`, options.body, options);

        return this.requestHandler(source);
    }

    @SetHeaders
    public patch<T>(baseUrl: string, entityUrl: string, options?: HttpRequestOptions, contentType: string = CONTENT_TYPE.JSON_TYPE): Observable<T> {
        const source = this.http.patch<T>(`${baseUrl}${entityUrl}`, options.body, options);

        return this.requestHandler(source);
    }

    @SetHeaders
    public delete<T>(baseUrl: string, entityUrl: string, options?: HttpRequestOptions): Observable<T> {
        const source = this.http.delete<T>(`${baseUrl}${entityUrl}`, options);

        return this.requestHandler(source);
    }
}
