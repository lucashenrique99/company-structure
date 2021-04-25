import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, filter, finalize, first, map, mergeMap, startWith } from 'rxjs/operators';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { SquadsService } from 'src/app/wrapper/modules/squads/service/squads.service';
import { ReleaseTrainResponsiblesService } from '../../../service/release-train-responsibles.service';
import { ReleaseTrainSquadsService } from '../../../service/release-train-squads.service';

@Component({
  selector: 'app-release-trains-squads-form',
  templateUrl: './release-trains-squads-form.component.html',
  styleUrls: ['./release-trains-squads-form.component.scss']
})
export class ReleaseTrainsSquadsFormComponent extends AbstractForm<ReleaseTrainSquadRequest, ReleaseTrainSquadResponse> {

  releaseTrain$!: Observable<string>;

  responsibleOptions: AutocompleteData[] = [];
  squadsOptions: AutocompleteData[] = [];

  constructor(
    protected fb: FormBuilder,
    protected service: ReleaseTrainSquadsService,
    protected messages: SnackbarUtilService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    private responsibleService: ReleaseTrainResponsiblesService,
    private squadsService: SquadsService,
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

    const subs$ = this.form.statusChanges
      .pipe(startWith(this.form.status), debounceTime(100))
      .subscribe(v => this.invalidForm = !this.form?.valid);
    this.subscriptions$.push(subs$);

    this.releaseTrain$ = this.getReleaseTrain();
    combineLatest([this.releaseTrain$, this.getReleaseTrainSquad()])
      .subscribe(
        ([releaseTrain, squad]) => {
          this.isLoadingRequest = true;
          this.service
            .findById<ReleaseTrainSquadResponse>(squad, {}, releaseTrain)
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

    this.getSquads();
    this.getResponsible();
  }

  onSave() {
    this.onBeforeSave();
    this.isLoadingRequest = true;
    this.releaseTrain$
      .pipe(
        first(),
        mergeMap(rt => this.service.save<ReleaseTrainSquadRequest, ReleaseTrainSquadResponse>(this.transformFormToData(), rt)),
        finalize(() => this.isLoadingRequest = false))
      .subscribe(
        (res) => {
          this.messages.showSuccessMessage(this.getSuccessMessage(res));
          this.isDataSaved = true;

          this.releaseTrain$.pipe(first())
            .subscribe(rt => this.router.navigate([`/rts/${rt}/squads/pesquisar`]));
        },
        (err: HttpErrorResponse) => this.messages.showErrorMessage(this.getErrorMessage(err))
      );
  }

  formConfigurer(): void {
    this.form = this.fb.group({
      id: [null],
      squad: [null, Validators.required],
      responsible: [null, Validators.required],
      notes: [null]
    });

  }

  updateForm(value: ReleaseTrainSquadResponse): void {
    this.form?.patchValue({
      ...value,
      responsible: !value.responsible ? null :
        {
          label: value.responsible.employee.name,
          value: value.responsible.id
        },
      squad: !value.squad ? null :
        {
          label: value.squad.name,
          value: value.squad.id
        }
    });

    this.form.get('squad')?.disable();
  }

  transformFormToData(): ReleaseTrainSquadRequest {
    const formData = this.form.getRawValue();

    return {
      ...formData,
      squad: formData?.squad?.value,
      responsible: formData?.responsible?.value,
    };
  }

  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Nova Squad" : "Editar Squad";
  }


  getSuccessMessage(res: any): string {
    return `Squad salva com sucesso`;
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

  private getResponsible() {
    this.releaseTrain$
      .pipe(
        first(),
        mergeMap(rt => this.responsibleService.findAll<{ id: number, employee: { name: string } }>({}, rt)))
      .subscribe(
        employees => this.responsibleOptions = (employees as { id: number, employee: { name: string } }[]).map(e => ({ label: e.employee.name, value: e.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private getSquads() {
    this.squadsService.findAll<{ id: number, name: string }>()
      .subscribe(
        squads => this.squadsOptions = (squads as { id: number, name: string }[]).map(s => ({ label: s.name, value: s.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private getReleaseTrainSquad(): Observable<string> {
    return this.activatedRoute
      .paramMap
      .pipe(
        filter((param: ParamMap) => param && param.has('id')),
        map(params => params.get("id") as string));
  }

}

interface ReleaseTrainSquadRequest {
  id: number;
  responsible: number;
  role: string;
  notes: string;
}

interface ReleaseTrainSquadResponse {
  id: number;
  squad?: {
    id: number;
    name: string;
    projectCode: string;
  }
  responsible?: {
    id: number;
    employee: {
      id: number;
      name: string;
      email: string;
    }
    role: string;
    notes: string;
  }
  notes: string;
}
