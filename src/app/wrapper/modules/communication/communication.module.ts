import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { FeedListComponent } from './views/feed-list/feed-list.component';
import { PostFormComponent } from './views/post-form/post-form.component';
import { EditorModule } from 'src/app/shared/components/editor/editor.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { CardPostComponent } from './views/feed-list/card-post/card-post.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FeedListComponent,
    PostFormComponent,
    CardPostComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule,

    EditorModule,
    ReactiveFormsModule,
    FormModule,
    FlexLayoutModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,

  ]
})
export class CommunicationModule { }
