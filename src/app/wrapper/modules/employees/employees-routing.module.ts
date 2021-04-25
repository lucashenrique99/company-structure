import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BirthdaysMonthListComponent } from './views/birthdays-month-list/birthdays-month-list.component';
import { EmployeesFormComponent } from './views/employees-form/employees-form.component';
import { EmployeesListComponent } from './views/employees-list/employees-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'pesquisar'
  },
  {
    path: '',
    pathMatch: 'prefix',
    data: {
      breadcrumb: 'Funcionários',
    },
    children: [
      {
        path: 'pesquisar',
        data: {
          breadcrumb: 'Pesquisar',
        },
        component: EmployeesListComponent
      },
      {
        path: 'aniversariantes-do-mes',
        data: {
          breadcrumb: 'Aniversariantes do mês',
        },
        component: BirthdaysMonthListComponent
      },
      {
        path: 'novo',
        data: {
          breadcrumb: 'Novo',
        },
        component: EmployeesFormComponent
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'Editar',
        },
        component: EmployeesFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
