import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedListComponent } from './views/feed-list/feed-list.component';
import { PostFormComponent } from './views/post-form/post-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'feed'
  },
  {
    path: '',
    pathMatch: 'prefix',
    data: {
      breadcrumb: 'Comunicados',
    },
    children: [
      {
        path: 'feed',
        data: {
          breadcrumb: 'Feed',
        },
        component: FeedListComponent
      },
      {
        path: 'novo',
        data: {
          breadcrumb: 'Novo Post',
        },
        component: PostFormComponent
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'Editar',
        },
        component: PostFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationRoutingModule { }
