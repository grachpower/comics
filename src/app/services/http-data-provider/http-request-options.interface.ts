import { HttpHeaders } from '@angular/common/http';
/**
 * Interface for options to construct a RequestOptions, based on HttpClient
 */
export interface HttpRequestOptions {
    headers?: HttpHeaders;
    body?: any;
    observe?: any;
    params?: any;
    reportProgress?: boolean;
    responseType?: any;
    withCredentials?: boolean;
    url?: string | null;
}
