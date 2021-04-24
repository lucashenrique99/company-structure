import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { AbstractForm, PageType } from 'src/app/shared/components/form/form/model/abstract-form';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { EmployeesService } from '../../service/employees.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.scss']
})
export class EmployeesFormComponent extends AbstractForm<EmployeeRequest, EmployeeResponse> {

  constructor(
    protected fb: FormBuilder,
    protected service: EmployeesService,
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
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required]],
      registrationGECO: [null],
      jobRole: [null],
      rg: [null],
      macNumber: [null],
      functional: [null],
      corporatePhone: [''],
      racf: [null],
      birthDate: [null],
      techStack: [null],
      phone: [''],
    });

  }

  updateForm(value: any): void {
    this.form?.patchValue({
      ...value,
      phone: value.phone || '',
      corporatePhone: value.corporatePhone || ''
    });

  }

  transformFormToData() : EmployeeRequest {
    const formData = this.form.getRawValue() as EmployeeRequest;

    return {
      ...formData,
      birthDate: moment(formData.birthDate).format('YYYY-MM-DD')
    }
  }

  getPageTitle(type: PageType) {
    return type === PageType.NEW_RESOURCE_PAGE ? "Novo Funcionário" : "Editar Funcionário";
  }


  getSuccessMessage(res: any): string {
    return `Funcionário salvo com sucesso`;
  }

  getListRoute(): string {
    return 'funcionarios/pesquisar';
  }
}

interface EmployeeRequest {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  registrationGECO?: string;
  jobRole?: string;
  rg?: string;
  macNumber?: string;
  functional?: string;
  corporatePhone?: string;
  racf?: string;
  birthDate?: string;
  techStack?: string;
  phone?: string;
}

interface EmployeeResponse {
  id?: number;
  name: string;
  email: string;
  cpf: string;
  registrationGECO?: string;
  jobRole?: string;
  rg?: string;
  macNumber?: string;
  functional?: string;
  corporatePhone?: string;
  racf?: string;
  birthDate?: string;
  techStack?: string;
  phone?: string;
}