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
        path: 'comunidades',
        loadChildren: () => import('./modules/communities/communities.module').then(e => e.CommunitiesModule)
      },
      {
        path: 'comunicados',
        loadChildren: () => import('./modules/communication/communication.module').then(e => e.CommunicationModule)
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
