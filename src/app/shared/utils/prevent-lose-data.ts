import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AbstractForm } from '../components/form/form/model/abstract-form';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class PreventLoseData implements CanDeactivate<AbstractForm<any, any>>{

    constructor(private dialog: MatDialog) { }

    canDeactivate(
        component: AbstractForm<any, any>,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if (component.isDataSaved || component.form.pristine) {
            return true;
        }

        return this.dialog.open(ConfirmationDialogComponent, {
            data: {
                message: `You may have unsaved data. Do you really want to leave without saving?`,
                title: 'Are you sure?'
            }
        })
            .afterClosed()
            .pipe(
                map(response => response !== null &&
                    response !== undefined &&
                    response.confirm))
    }

}