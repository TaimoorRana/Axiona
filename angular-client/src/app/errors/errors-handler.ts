import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../services/message.service';
import { ErrorsService } from '../services/errors.service';

@Injectable()
export class ErrorsHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {

        const messageService = this.injector.get(MessageService);
        const errorsService = this.injector.get(ErrorsService);

        if (error instanceof HttpErrorResponse) {
            // Error: server or connection
            if (!navigator.onLine) {
                // Error: application offline
                return messageService.add('No Internet Connection');
            }

            // Error: Http
            return messageService.add(`${error.status} - ${error.message}`);

        } else {
            // Error: Client
            errorsService.log(error).subscribe( err => {
                // TODO: navigate to error page
            });
        }

    }
}
