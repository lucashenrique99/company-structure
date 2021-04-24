import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarUtilService {

  constructor(private snackbar: MatSnackBar) { }

  showMessage(message: string, action?: string, options: any = { duration: 3000 }) {
    return this.snackbar.open(
      message,
      action,
      options
    )
  }

  showSuccessMessage(message: string, action?: string) {
    return this.showMessage(message, action, {
      duration: 3000,
      panelClass: 'success-message',

    });
  }

  showErrorMessage(message: string, action?: string) {
    return this.showMessage(message, action, {
      duration: 3000,
      panelClass: 'error-message',

    });
  }

  showWarningMessage(message: string, action?: string) {
    return this.showMessage(message, action, {
      duration: 3000,
      panelClass: 'warning-message',

    });
  }
}
