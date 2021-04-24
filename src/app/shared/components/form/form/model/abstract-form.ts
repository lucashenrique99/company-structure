import { AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { filter, finalize, debounceTime, startWith } from 'rxjs/operators';
import { OnInit, OnDestroy, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';

@Injectable()
export abstract class AbstractForm<req, resp> implements OnInit, OnDestroy {

    title?: string;
    form!: FormGroup;
    isLoadingRequest: boolean = false;

    invalidForm: boolean = false;

    isDataSaved: boolean = false;

    subscriptions$: Subscription[] = [];

    constructor(
        protected formBuilder: FormBuilder,
        protected service: ApiService,
        protected messages: SnackbarUtilService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected errorHandler: ErrorHandlerService
    ) { }

    abstract formConfigurer(): void;

    abstract updateForm(value: resp): void;

    abstract getSuccessMessage(response?: resp): string;

    abstract getListRoute(): string;

    abstract getPageTitle(type: PageType, data?: resp): string;

    ngOnInit() {
        this.title = this.getPageTitle(PageType.NEW_RESOURCE_PAGE);
        this.formConfigurer();

        const subs$ = this.form.statusChanges
            .pipe(startWith(this.form.status), debounceTime(100))
            .subscribe(v => this.invalidForm = !this.form?.valid);
        this.subscriptions$.push(subs$);

        this.activatedRoute
            .paramMap
            .pipe(filter((param: ParamMap) => param && param.has('id')))
            .subscribe(
                (param: ParamMap) => {
                    this.isLoadingRequest = true;
                    this.service
                        .findById<resp>(param.get('id') || '')
                        .pipe(
                            finalize(() => {
                                this.isLoadingRequest = false;
                            }),
                            filter(value => value !== null && value !== undefined)
                        )
                        .subscribe(
                            (value) => {
                                this.updateForm(value);
                                this.title = this.getPageTitle(PageType.EDIT_PAGE, value);
                            },
                            (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err),
                        )
                }
            )

    }

    ngOnDestroy() {
        this.subscriptions$.forEach(s => s.unsubscribe());
    }

    getErrorMessage(err?: HttpErrorResponse): string {
        return this.errorHandler.getErrorMessage(err);
    }

    onBeforeSave(): void { }

    transformFormToData(): req {
        return this.form?.getRawValue();
    };

    onSave() {
        this.onBeforeSave();
        this.isLoadingRequest = true;
        this.service.save<req, resp>(this.transformFormToData())
            .pipe(finalize(() => this.isLoadingRequest = false))
            .subscribe(
                (res) => {
                    this.messages.showSuccessMessage(this.getSuccessMessage(res));
                    this.isDataSaved = true;
                    this.router.navigate([this.getListRoute()]);
                },
                (err: HttpErrorResponse) => this.messages.showErrorMessage(this.getErrorMessage(err))
            );
    }

    getField(id: string): AbstractControl | null {
        return this.form?.get(id) || null;
    }

    hasError(formId: string, error: string): boolean {
        return this.form?.get(formId)?.hasError(error) || false;
    }

    isInvalidForm(): boolean {
        return this.invalidForm;
    }

}

export enum PageType {
    NEW_RESOURCE_PAGE,
    EDIT_PAGE
}
