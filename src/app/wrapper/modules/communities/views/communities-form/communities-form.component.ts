import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { EmployeesService } from '../../../employees/service/employees.service';
import { CommunitiesService } from '../../service/communities.service';

@Component({
  selector: 'app-communities-form',
  templateUrl: './communities-form.component.html',
  styleUrls: ['./communities-form.component.scss']
})
export class CommunitiesFormComponent extends AbstractForm<CommunityRequest, CommunityResponse> {

  leaderOptions: AutocompleteData[] = [];

  constructor(
    protected fb: FormBuilder,
    protected service: CommunitiesService,
    protected messages: SnackbarUtilService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected errorHandler: ErrorHandlerService,
    private employeesService: EmployeesService,
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
  }

  formConfigurer(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      leader: [null, Validators.required],
    });

  }

  updateForm(value: CommunityResponse): void {
    this.form?.patchValue({
      id: value.id,
      name: value.name,
      leader: {
        label: value.leader.name,
        value: value.leader.id
      }
    });
  }

  transformFormToData(): CommunityRequest {
    const formData = this.form.getRawValue();
    return {
      ...formData,
      leader: formData.leader.value
    }
  }

  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Nova Comunidade" : "Editar Comunidade";
  }


  getSuccessMessage(res: any): string {
    return `Comunidade salva com sucesso`;
  }

  getListRoute(): string {
    return 'comunidades/pesquisar';
  }


  private getEmployees() {
    this.employeesService.findAll<{ id: number, name: string }>()
      .subscribe(
        employees => this.leaderOptions = (employees as { id: number, name: string }[]).map(e => ({ label: e.name, value: e.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

}

interface CommunityRequest {
  id?: number;
  name: string;
  leader?: number;

}

interface CommunityResponse {
  id?: number;
  name: string;
  leader: {
    id: number;
    name: string;
    email: string;
  }
}
