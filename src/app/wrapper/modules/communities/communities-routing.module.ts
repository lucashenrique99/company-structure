import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunitiesFormComponent } from './views/communities-form/communities-form.component';
import { CommunitiesListComponent } from './views/communities-list/communities-list.component';
import { CommunitiesOrgComponent } from './views/communities-org/communities-org.component';

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
      breadcrumb: 'Comunidades',
    },
    children: [
      {
        path: 'pesquisar',
        data: {
          breadcrumb: 'Pesquisar',
        },
        component: CommunitiesListComponent
      },
      {
        path: 'estrutura',
        data: {
          breadcrumb: 'Estrutura da Comunidade',
        },
        component: CommunitiesOrgComponent
      },
      {
        path: 'nova',
        data: {
          breadcrumb: 'Nova',
        },
        component: CommunitiesFormComponent
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'Editar',
        },
        component: CommunitiesFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunitiesRoutingModule { }
