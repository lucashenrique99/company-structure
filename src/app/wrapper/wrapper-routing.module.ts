import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      {
        path: 'funcionarios',
        loadChildren: () => import('./modules/employees/employees.module').then(e => e.EmployeesModule)
      },
      {
        path: 'squads',
        loadChildren: () => import('./modules/squads/squads.module').then(e => e.SquadsModule)
      },
      {
        path: 'rts',
        loadChildren: () => import('./modules/release-trains/release-trains.module').then(e => e.ReleaseTrainsModule)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WrapperRoutingModule { }
