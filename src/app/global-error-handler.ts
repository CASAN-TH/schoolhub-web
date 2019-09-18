import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from './services/logging.service';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    // tslint:disable-next-line: typedef
    handleError(error) {
        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        const stackTrace = null;
        if (error instanceof HttpErrorResponse) {
            // Server error
            message = errorService.getServerErrorMessage(error);

            notifier.showError(message);
        } else if (error.rejection instanceof HttpErrorResponse) {
            // Promise Server error
            message = errorService.getServerErrorMessage(error.rejection);

            notifier.showError(message);
        }
        else {
            // Client Error
            message = errorService.getClientErrorMessage(error);
            notifier.showError(message);
        }
        // Always log errors
        logger.logError(message, stackTrace);
    }
}
