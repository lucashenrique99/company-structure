import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseTrainsRoutingModule } from './release-trains-routing.module';
import { ReleaseTrainsFormComponent } from './views/release-trains-form/release-trains-form.component';
import { ReleaseTrainsListComponent } from './views/release-trains-list/release-trains-list.component';
import { ReleaseTrainsResponsibleComponent } from './views/release-trains-responsible/release-trains-responsible.component';
import { ReleaseTrainsResponsibleFormComponent } from './views/release-trains-responsible/release-trains-responsible-form/release-trains-responsible-form.component';
import { ReleaseTrainsResponsibleListComponent } from './views/release-trains-responsible/release-trains-responsible-list/release-trains-responsible-list.component';
import { ReleaseTrainsSquadComponent } from './views/release-trains-squad/release-trains-squad.component';
import { ReleaseTrainsSquadsListComponent } from './views/release-trains-squad/release-trains-squads-list/release-trains-squads-list.component';
import { ReleaseTrainsSquadsFormComponent } from './views/release-trains-squad/release-trains-squads-form/release-trains-squads-form.component';
import { ReleaseTrainOrgComponent } from './views/release-train-org/release-train-org.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { AutocompleteModule } from 'src/app/shared/components/autocomplete/autocomplete.module';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { ListModule } from 'src/app/shared/components/list/list.module';
import { RadiobuttonModule } from 'src/app/shared/components/radiobutton/radiobutton.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { PipesModule } from 'src/app/shared/pipes/pipes/pipes.module';
import { ReleaseTrainDialogComponent } from './components/release-train-dialog/release-train-dialog.component';


@NgModule({
  declarations: [
    ReleaseTrainsFormComponent,
    ReleaseTrainsListComponent,
    ReleaseTrainsResponsibleComponent,
    ReleaseTrainsResponsibleFormComponent,
    ReleaseTrainsResponsibleListComponent,
    ReleaseTrainsSquadComponent,
    ReleaseTrainsSquadsListComponent,
    ReleaseTrainsSquadsFormComponent,
    ReleaseTrainOrgComponent,
    ReleaseTrainDialogComponent
  ],
  imports: [
    CommonModule,
    ReleaseTrainsRoutingModule,

    ReactiveFormsModule,
    DialogModule,
    FormModule,
    FlexLayoutModule,
    ListModule,
    TableModule,
    RadiobuttonModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    AutocompleteModule,

    OrganizationChartModule,

    NgxMaskModule,

    PipesModule,
  ]
})
export class ReleaseTrainsModule { }
