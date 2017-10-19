import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {

    constructor() {
    }

    public handleError(errorResponse: HttpErrorResponse | any): Observable<any> {
        const {status, statusText, error, message} = errorResponse;
        let errMsg: string = 'Unknown error!';

        if (!error && message) {
            errMsg = message;
        } else if (errorResponse instanceof HttpErrorResponse && error.description) {
            errMsg = error.description;
        } else {
            errMsg = error ? error.toString() : errMsg;
        }

        console.error(`${status}: ${statusText}| Error: ${errMsg}`);
        return Observable.throw(errMsg);
    }
}
