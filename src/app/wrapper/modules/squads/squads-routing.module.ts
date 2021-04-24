import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SquadsFormComponent } from './views/squads-form/squads-form.component';
import { SquadsListComponent } from './views/squads-list/squads-list.component';
import { SquadsMembersFormComponent } from './views/squads-members-form/squads-members-form.component';
import { SquadsMembersListComponent } from './views/squads-members-list/squads-members-list.component';
import { SquadsComponent } from './views/squads/squads.component';

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
      breadcrumb: 'Squads',
    },
    children: [
      {
        path: 'pesquisar',
        data: {
          breadcrumb: 'Pesquisar',
        },
        component: SquadsListComponent
      },
      {
        path: 'nova',
        data: {
          breadcrumb: 'Nova',
        },
        component: SquadsFormComponent
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'Editar',
        },
        component: SquadsFormComponent
      },
      {
        path: ':squad/membros',
        data: {
          breadcrumb: 'Membros da Squad',
        },
        component: SquadsComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'pesquisar'
          },
          {
            path: 'pesquisar',
            data: {
              breadcrumb: 'Pesquisar',
            },
            component: SquadsMembersListComponent
          },
          {
            path: 'novo',
            data: {
              breadcrumb: 'Novo',
            },
            component: SquadsMembersFormComponent
          },
          {
            path: ':id',
            data: {
              breadcrumb: 'Editar',
            },
            component: SquadsMembersFormComponent
          },
          {
            path: '**',
            redirectTo: 'pesquisar'
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SquadsRoutingModule { }
