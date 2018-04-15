import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { ErrorsService } from '../services/errors.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    /**
     * Intercepts application errors
     *
     * @param {(Error | HttpErrorResponse)} error
     * @returns
     * @memberof ErrorsHandler
     */
    handleError(error: Error | HttpErrorResponse) {

        const messageService = this.injector.get(MessageService);
        const errorsService = this.injector.get(ErrorsService);
        const router = this.injector.get(Router);

        if (error instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
                // Error: application offline
                return messageService.setErrorMessage('No Internet Connection');
            }
            // Error: Http
            return messageService.setErrorMessage(`${error.status} - ${error.message}`);
        } else {
            // Error: Client
            errorsService.log(error).subscribe(errorInfo => {
                router.navigate(['/error'], { queryParams: errorInfo });
              });
        }
    }
}
