import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { startWith, debounceTime, filter, finalize, first, mergeMap, map } from 'rxjs/operators';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { ReleaseTrainRolePipe } from 'src/app/shared/pipes/pipes/pipes/release-train-role.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { EmployeesService } from 'src/app/wrapper/modules/employees/service/employees.service';
import { ReleaseTrainResponsiblesService } from '../../../service/release-train-responsibles.service';

@Component({
  selector: 'app-release-trains-responsible-form',
  templateUrl: './release-trains-responsible-form.component.html',
  styleUrls: ['./release-trains-responsible-form.component.scss']
})
export class ReleaseTrainsResponsibleFormComponent extends AbstractForm<ReleaseTrainResponsibleRequest, ReleaseTrainResponsibleResponse> {

  releaseTrain$!: Observable<string>;

  roles!: { label: string, value: string }[];
  employeeOptions: AutocompleteData[] = [];

  constructor(
    protected fb: FormBuilder,
    protected service: ReleaseTrainResponsiblesService,
    protected messages: SnackbarUtilService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    private rolePipe: ReleaseTrainRolePipe,
    private employeesService: EmployeesService
  ) {
    super(
      fb,
      service,
      messages,
      router,
      activatedRoute,
      errorHandler
    );

  }

  ngOnInit() {
    this.title = this.getPageTitle(PageType.NEW_RESOURCE_PAGE);
    this.formConfigurer();
    this.buildRoles();
    this.getEmployees();
    this.getReleaseTrain();

    const subs$ = this.form.statusChanges
      .pipe(startWith(this.form.status), debounceTime(100))
      .subscribe(v => this.invalidForm = !this.form?.valid);
    this.subscriptions$.push(subs$);

    this.releaseTrain$ = this.getReleaseTrain();
    combineLatest([this.releaseTrain$, this.getResponsible()])
      .subscribe(
        ([releaseTrain, responsible]) => {
          this.isLoadingRequest = true;
          this.service
            .findById<ReleaseTrainResponsibleResponse>(responsible, {}, releaseTrain)
            .pipe(
              filter(value => value !== null && value !== undefined),
              finalize(() => this.isLoadingRequest = false)
            )
            .subscribe(
              (value) => {
                this.updateForm(value);
                this.title = this.getPageTitle(PageType.EDIT_PAGE);
              },
              (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err),
            )
        }
      )

  }

  onSave() {
    this.onBeforeSave();
    this.isLoadingRequest = true;
    this.releaseTrain$
      .pipe(
        first(),
        mergeMap(rt => this.service.save<ReleaseTrainResponsibleRequest, ReleaseTrainResponsibleResponse>(this.transformFormToData(), rt)),
        finalize(() => this.isLoadingRequest = false))
      .subscribe(
        (res) => {
          this.messages.showSuccessMessage(this.getSuccessMessage(res));
          this.isDataSaved = true;

          this.releaseTrain$.pipe(first())
            .subscribe(rt => this.router.navigate([`/rts/${rt}/responsaveis/pesquisar`]));
        },
        (err: HttpErrorResponse) => this.messages.showErrorMessage(this.getErrorMessage(err))
      );
  }

  formConfigurer(): void {
    this.form = this.fb.group({
      id: [null],
      role: [null, Validators.required],
      employee: [null, Validators.required],
      notes: [null]
    });

  }

  updateForm(value: ReleaseTrainResponsibleResponse): void {
    this.form?.patchValue({
      ...value,
      employee: !value.employee ? null :
        {
          label: value.employee.name,
          value: value.employee.id
        }
    });
  }

  transformFormToData(): ReleaseTrainResponsibleRequest {
    const formData = this.form.getRawValue();

    return {
      ...formData,
      employee: formData?.employee?.value
    };
  }

  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Novo Responsável" : "Editar Responsável";
  }


  getSuccessMessage(res: any): string {
    return `Responsável salvo com sucesso`;
  }

  getListRoute(): string {
    return 'rts/pesquisar';
  }


  private getReleaseTrain(): Observable<string> {
    return this.activatedRoute.parent?.paramMap
      .pipe(
        filter(params => params.has("rt")),
        map(params => params.get("rt") as string)) as Observable<string>;
  }

  private getEmployees() {
    this.employeesService.findAll<{ id: number, name: string }>()
      .subscribe(
        employees => this.employeeOptions = (employees as { id: number, name: string }[]).map(e => ({ label: e.name, value: e.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private getResponsible(): Observable<string> {
    return this.activatedRoute
      .paramMap
      .pipe(
        filter((param: ParamMap) => param && param.has('id')),
        map(params => params.get("id") as string));
  }

  private buildRoles() {
    this.roles = ['LEADER', 'LTF']
      .map(role => ({
        label: this.rolePipe.transform(role),
        value: role
      }));
  }

}

interface ReleaseTrainResponsibleRequest {
  id: number;
  employee: number;
  role: string;
  notes: string;
}

interface ReleaseTrainResponsibleResponse {
  id: number;
  role: string;
  employee?: {
    id: number;
    name: string;
    email: string;
  }
  notes: string;
}
