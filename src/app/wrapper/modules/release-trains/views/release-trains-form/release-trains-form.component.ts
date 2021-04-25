import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { CommunitiesService } from '../../../communities/service/communities.service';
import { EmployeesService } from '../../../employees/service/employees.service';
import { ReleaseTrainsService } from '../../service/release-trains.service';

@Component({
  selector: 'app-release-trains-form',
  templateUrl: './release-trains-form.component.html',
  styleUrls: ['./release-trains-form.component.scss']
})
export class ReleaseTrainsFormComponent extends AbstractForm<ReleaseTrainRequest, ReleaseTrainResponse> {

  _showResponsible = true;

  employeeOptions: AutocompleteData[] = [];
  communitiesOptions: AutocompleteData[] = [];

  constructor(
    protected fb: FormBuilder,
    protected service: ReleaseTrainsService,
    protected messages: SnackbarUtilService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    private employeesService: EmployeesService,
    private communitiesService: CommunitiesService
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
    super.ngOnInit();
    this.getEmployees();
    this.getCommunities();
  }

  formConfigurer(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      responsible: [null, Validators.required],
      community: [null, Validators.required],
      notes: [null]
    });

  }

  updateForm(value: ReleaseTrainResponse): void {
    this.form?.patchValue({
      id: value.id,
      name: value.name,
      notes: value.notes,
      community: {
        label: value.community.name,
        value: value.community.id
      }
    });

    this._showResponsible = false;
    this.form.get('responsible')?.disable();
  }

  transformFormToData(): ReleaseTrainRequest {
    const formData = this.form.getRawValue();
    return {
      ...formData,
      responsible: formData.responsible?.value || null,
      community: formData.community.value
    }
  }

  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Nova RT" : "Editar RT";
  }


  getSuccessMessage(res: any): string {
    return `RT salva com sucesso`;
  }

  getListRoute(): string {
    return 'rts/pesquisar';
  }


  private getEmployees() {
    this.employeesService.findAll<{ id: number, name: string }>()
      .subscribe(
        employees => this.employeeOptions = (employees as { id: number, name: string }[]).map(e => ({ label: e.name, value: e.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private getCommunities() {
    this.communitiesService.findAll<{ id: number, name: string }>()
      .subscribe(
        communities => this.communitiesOptions = (communities as { id: number, name: string }[]).map(e => ({ label: e.name, value: e.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

}

interface ReleaseTrainRequest {
  id?: number;
  name: string;
  responsible?: number;
  community: number;
  notes?: string;

}

interface ReleaseTrainResponse {
  id?: number;
  name: string;
  notes?: string;
  community: {
    id: number;
    name: string;
  }
}
