import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunitiesRoutingModule } from './communities-routing.module';
import { CommunitiesFormComponent } from './views/communities-form/communities-form.component';
import { CommunitiesListComponent } from './views/communities-list/communities-list.component';
import { CommunitiesOrgComponent } from './views/communities-org/communities-org.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AutocompleteModule } from 'src/app/shared/components/autocomplete/autocomplete.module';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { ListModule } from 'src/app/shared/components/list/list.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { PipesModule } from 'src/app/shared/pipes/pipes/pipes.module';


@NgModule({
  declarations: [
    CommunitiesFormComponent,
    CommunitiesListComponent,
    CommunitiesOrgComponent
  ],
  imports: [
    CommonModule,
    CommunitiesRoutingModule,
    
    ReactiveFormsModule,
    DialogModule,
    FormModule,
    FlexLayoutModule,
    ListModule,
    TableModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AutocompleteModule,

    OrganizationChartModule,

    PipesModule,
  ]
})
export class CommunitiesModule { }
