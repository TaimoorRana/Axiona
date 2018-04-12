import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    handleError(error: Error | HttpErrorResponse) {
        if (error instanceof HttpErrorResponse) {
            // Error: server or connection
            if (!navigator.onLine) {
                // Error: application offline
            } else {
                // Error: Http
            }
        } else {
            // Error: Client
        }

        console.error('Error: ', error);
    }
}
