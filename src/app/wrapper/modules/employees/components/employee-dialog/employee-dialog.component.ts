import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { DialogData } from 'src/app/shared/components/dialog/dialog/dialog.component';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { EmployeesService } from '../../service/employees.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {

  employee!: EmployeeResponse;
  rows: Array<DialogData> = [];

  isLoading: boolean = false;

  dialogTitle: string = 'Funcionário';

  constructor(
    private service: EmployeesService,
    private errorHandler: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit() {
    this.buildDialogRows();
    this.getData();
  }

  private buildDialogRows() {
    this.rows = [
      {
        label: 'Data de criação',
        field: (data) => data.createdDate,
        width: 50,
        pipe: DynamicPipeOptions.DATE,
        pipeArgs: (data: EmployeeResponse) => ['medium']
      },
      {
        label: 'Última modificação',
        field: (data: EmployeeResponse) => data.lastModifiedDate,
        width: 50,
        pipe: DynamicPipeOptions.DATE,
        pipeArgs: (data: EmployeeResponse) => ['medium']
      },
      {
        label: 'Nome',
        field: (data: EmployeeResponse) => data.name,
        width: 50,
      },
      {
        label: 'Email',
        field: (data: EmployeeResponse) => data.email,
        width: 50
      },
      {
        label: 'CPF',
        field: (data: EmployeeResponse) => data.name,
        width: 50,
        pipe: DynamicPipeOptions.MASK,
        pipeArgs: () => ['000.000.000-00'],
      },
      {
        label: 'RG',
        field: (data: EmployeeResponse) => data.rg,
        width: 50
      },
      {
        label: 'Celular',
        field: (data: EmployeeResponse) => data.phone,
        width: 50,
        pipe: DynamicPipeOptions.MASK,
        pipeArgs: () => ['(00) 0000-0000||(00) 0 0000-0000']
      },
      {
        label: 'Data de nascimento',
        field: (data: EmployeeResponse) => data.birthDate,
        width: 50,
        pipe: DynamicPipeOptions.DATE,
        pipeArgs: (data: EmployeeResponse) => ['shortDate']
      },
      {
        label: 'Cargo',
        field: (data: EmployeeResponse) => data.jobRole,
        width: 50
      },
      
      {
        label: 'Tecnologia(s)',
        field: (data: EmployeeResponse) => data.techStack,
        width: 50
      },
      {
        label: 'Registro GECO',
        field: (data: EmployeeResponse) => data.registrationGECO,
        width: 50
      },
      {
        label: 'Número MAC',
        field: (data: EmployeeResponse) => data.macNumber,
        width: 50
      },
      {
        label: 'Funcional',
        field: (data: EmployeeResponse) => data.functional,
        width: 50
      },
      {
        label: 'RACF',
        field: (data: EmployeeResponse) => data.racf,
        width: 50
      },
      {
        label: 'Telefone Corporativo',
        field: (data: EmployeeResponse) => data.corporatePhone,
        width: 50,
        pipe: DynamicPipeOptions.MASK,
        pipeArgs: () => ['(00) 0000-0000||(00) 0 0000-0000']
      },
    ];
  }

  private getData() {
    this.isLoading = true;
    this.service.findById<EmployeeResponse>(this.data.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        employee => {
          this.employee = employee;
          this.dialogTitle = employee.name;
        },
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );
  }

}

interface EmployeeResponse {
  id?: number;
  name: string;
  cpf: string;
  email: string;
  createdDate: string;
  lastModifiedDate: string;
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