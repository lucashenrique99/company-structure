import { Injectable, Injector } from '@angular/core';
import { SnackbarUtilService } from '../snackbar/snackbar-util.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private injector: Injector) { }

  httpErrorResponseHandler(err: HttpErrorResponse) {
    const messageService = this.injector.get(SnackbarUtilService);
    const message = this.getErrorMessage(err);
    console.log(err);
    console.log(message);
    messageService.showErrorMessage(message);
  }

  getErrorMessage(err?: HttpErrorResponse): string {
    if (err) {
      switch (err.status) {
        case 404:
          return (err.error && err.error.error) ? err.error.error : "Resource not found";
        case 401:
        case 403:
          return (err.error && err.error.error) ? err.error.error : "Unauthorized access";
        case 400:
        case 422:
          if (err.error && err.error.error) {
            return err.error.error;
          } else if (err.error && err.error.errors) {
            return err.error.errors
              .map((e: { error: string }) => `${e.error}`)
              .join("; ");
          } else {
            return `Your request was declined, possibly due to a form error. Check back again please. If you continue, contact our support team.`;
          }
        case 500:
          return `An internal error has occurred. Try again please. If you continue, contact our support team.`;
        case 0:
          return "An internet connection error has occurred. You are possibly offline. Check your internet connection please.";
        default:
          return "Unknown error. Contact our support team please.";

      }
    }
    return '';
  }
}

