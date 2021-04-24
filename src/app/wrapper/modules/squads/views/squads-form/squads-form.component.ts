import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { SquadsService } from '../../service/squads.service';

@Component({
  selector: 'app-squads-form',
  templateUrl: './squads-form.component.html',
  styleUrls: ['./squads-form.component.scss']
})
export class SquadsFormComponent extends AbstractForm<SquadRequest, SquadResponse> {

  constructor(
    protected fb: FormBuilder,
    protected service: SquadsService,
    protected messages: SnackbarUtilService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected errorHandler: ErrorHandlerService
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

  formConfigurer(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      projectCode: [null],
      notes: [null]
    });

  }

  updateForm(value: any): void {
    this.form?.patchValue(value);
  }

  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Nova Squad" : "Editar Squad";
  }


  getSuccessMessage(res: any): string {
    return `Squad salva com sucesso`;
  }

  getListRoute(): string {
    return 'squads/pesquisar';
  }
}

interface SquadRequest {
  id?: number;
  name: string;
  projectCode?: string;
  notes?: string;

}

interface SquadResponse {
  id?: number;
  name: string;
  projectCode?: string;
  notes?: string;
}