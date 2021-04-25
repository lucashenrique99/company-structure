import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseTrainOrgComponent } from './views/release-train-org/release-train-org.component';
import { ReleaseTrainsFormComponent } from './views/release-trains-form/release-trains-form.component';
import { ReleaseTrainsListComponent } from './views/release-trains-list/release-trains-list.component';
import { ReleaseTrainsResponsibleFormComponent } from './views/release-trains-responsible/release-trains-responsible-form/release-trains-responsible-form.component';
import { ReleaseTrainsResponsibleListComponent } from './views/release-trains-responsible/release-trains-responsible-list/release-trains-responsible-list.component';
import { ReleaseTrainsResponsibleComponent } from './views/release-trains-responsible/release-trains-responsible.component';
import { ReleaseTrainsSquadComponent } from './views/release-trains-squad/release-trains-squad.component';
import { ReleaseTrainsSquadsFormComponent } from './views/release-trains-squad/release-trains-squads-form/release-trains-squads-form.component';
import { ReleaseTrainsSquadsListComponent } from './views/release-trains-squad/release-trains-squads-list/release-trains-squads-list.component';

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
      breadcrumb: 'RTs',
    },
    children: [
      {
        path: 'pesquisar',
        data: {
          breadcrumb: 'Pesquisar',
        },
        component: ReleaseTrainsListComponent
      },
      {
        path: 'estrutura',
        data: {
          breadcrumb: 'Estrutura',
        },
        component: ReleaseTrainOrgComponent
      },
      {
        path: 'nova',
        data: {
          breadcrumb: 'Nova',
        },
        component: ReleaseTrainsFormComponent
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'Editar',
        },
        component: ReleaseTrainsFormComponent
      },
      {
        path: ':rt/responsaveis',
        data: {
          breadcrumb: 'Responsáveis pela RT',
        },
        component: ReleaseTrainsResponsibleComponent,
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
            component: ReleaseTrainsResponsibleListComponent
          },
          {
            path: 'novo',
            data: {
              breadcrumb: 'Novo',
            },
            component: ReleaseTrainsResponsibleFormComponent
          },
          {
            path: ':id',
            data: {
              breadcrumb: 'Editar',
            },
            component: ReleaseTrainsResponsibleFormComponent
          },
          {
            path: '**',
            redirectTo: 'pesquisar'
          }
        ]
      },
      {
        path: ':rt/squads',
        data: {
          breadcrumb: 'Squads da RT',
        },
        component: ReleaseTrainsSquadComponent,
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
            component: ReleaseTrainsSquadsListComponent
          },
          {
            path: 'nova',
            data: {
              breadcrumb: 'Nova',
            },
            component: ReleaseTrainsSquadsFormComponent
          },
          {
            path: ':id',
            data: {
              breadcrumb: 'Editar',
            },
            component: ReleaseTrainsSquadsFormComponent
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
export class ReleaseTrainsRoutingModule { }
