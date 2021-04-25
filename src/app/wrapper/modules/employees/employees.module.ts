import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './views/employees-list/employees-list.component';
import { EmployeesFormComponent } from './views/employees-form/employees-form.component';
import { EmployeeDialogComponent } from './components/employee-dialog/employee-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListModule } from 'src/app/shared/components/list/list.module';
import { PipesModule } from 'src/app/shared/pipes/pipes/pipes.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BirthdaysMonthListComponent } from './views/birthdays-month-list/birthdays-month-list.component';


@NgModule({
  declarations: [
    EmployeesListComponent,
    EmployeesFormComponent,
    EmployeeDialogComponent,
    BirthdaysMonthListComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,

    ReactiveFormsModule,
    DialogModule,
    FormModule,
    FlexLayoutModule,
    ListModule,
    TableModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,

    NgxMaskModule,

    PipesModule,
  ]
})
export class EmployeesModule { }
