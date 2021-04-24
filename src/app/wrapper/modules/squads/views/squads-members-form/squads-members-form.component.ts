import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, finalize, first, map, mergeMap, startWith, tap } from 'rxjs/operators';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { RadiobuttonData } from 'src/app/shared/components/radiobutton/radiobutton/radiobutton.component';
import { SquadRolePipe } from 'src/app/shared/pipes/pipes/pipes/squad-role.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { EmployeesService } from '../../../employees/service/employees.service';
import { SquadMembersService } from '../../service/squad-members.service';

@Component({
  selector: 'app-squads-members-form',
  templateUrl: './squads-members-form.component.html',
  styleUrls: ['./squads-members-form.component.scss']
})
export class SquadsMembersFormComponent extends AbstractForm<SquadMemberRequest, SquadMemberResponse> {

  squad$!: Observable<string>;

  roles!: { label: string, value: string }[];
  isExternalOptions!: RadiobuttonData[];
  employeeOptions: AutocompleteData[] = [];

  constructor(
    protected fb: FormBuilder,
    protected service: SquadMembersService,
    protected messages: SnackbarUtilService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    private squadRolePipe: SquadRolePipe,
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
    this.buildIsExternalOptions();
    this.getEmployees();
    this.getSquad();

    const subs$ = this.form.statusChanges
      .pipe(startWith(this.form.status), debounceTime(100))
      .subscribe(v => this.invalidForm = !this.form?.valid);
    this.subscriptions$.push(subs$);

    this.squad$ = this.getSquad();
    combineLatest([this.squad$, this.getMember()])
      .subscribe(
        ([squad, member]) => {
          this.isLoadingRequest = true;
          this.service
            .findById<SquadMemberResponse>(member, {}, squad)
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
    this.squad$
      .pipe(
        first(),
        mergeMap(squad => this.service.save<SquadMemberRequest, SquadMemberResponse>(this.transformFormToData(), squad)),
        finalize(() => this.isLoadingRequest = false))
      .subscribe(
        (res) => {
          this.messages.showSuccessMessage(this.getSuccessMessage(res));
          this.isDataSaved = true;

          this.squad$.pipe(first())
            .subscribe(squad => this.router.navigate([`/squads/${squad}/membros/pesquisar`]));
        },
        (err: HttpErrorResponse) => this.messages.showErrorMessage(this.getErrorMessage(err))
      );
  }

  formConfigurer(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      role: [null, Validators.required],
      isExternal: [false],
      employee: [null],
      notes: [null]
    });

    const subs$ = this.form.get('isExternal')?.valueChanges
      .subscribe((isExternal: boolean) => {
        const employeeControl = this.form.get('employee');
        if (isExternal) {
          employeeControl?.reset();
          employeeControl?.disable();
        } else {
          employeeControl?.enable();
        }
      });

    if (subs$) {
      this.subscriptions$.push(subs$);
    }
  }

  updateForm(value: SquadMemberResponse): void {
    this.form?.patchValue({
      ...value,
      employee: !value.employee ? null :
        {
          label: value.employee.name,
          value: value.employee.id
        }
    });
  }

  transformFormToData(): SquadMemberRequest {
    const formData = this.form.getRawValue();

    return {
      ...formData,
      employee: formData?.employee?.value
    };
  }

  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Novo Membro" : "Editar Membro";
  }


  getSuccessMessage(res: any): string {
    return `Membro salvo com sucesso`;
  }

  getListRoute(): string {
    return 'squads/pesquisar';
  }


  private getSquad(): Observable<string> {
    return this.activatedRoute.parent?.paramMap
      .pipe(
        filter(params => params.has("squad")),
        map(params => params.get("squad") as string)) as Observable<string>;
  }

  private getEmployees() {
    this.employeesService.findAll<{ id: number, name: string }>()
      .subscribe(
        employees => this.employeeOptions = (employees as { id: number, name: string }[]).map(e => ({ label: e.name, value: e.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private getMember(): Observable<string> {
    return this.activatedRoute
      .paramMap
      .pipe(
        filter((param: ParamMap) => param && param.has('id')),
        map(params => params.get("id") as string));
  }

  private buildRoles() {
    this.roles = ['TEAM_LEAD', 'TECH_LEAD', 'PRODUCT_OWNER', 'ENGINEER', 'TESTER', 'DESIGNER']
      .map(role => ({
        label: this.squadRolePipe.transform(role),
        value: role
      }));
  }

  private buildIsExternalOptions() {
    this.isExternalOptions = [
      {
        label: 'Sim',
        value: true
      },
      {
        label: 'Não',
        value: false
      }
    ]
  }
}

interface SquadMemberRequest {
  id: number;
  name: string;
  role: string;
  isExternal: boolean;
  employee?: {
    id: number;
    name: string;
    email: string;
  }
  notes: string;
}

interface SquadMemberResponse {
  id: number;
  name: string;
  role: string;
  isExternal: boolean;
  employee?: {
    id: number;
    name: string;
    email: string;
  }
  notes: string;
}
