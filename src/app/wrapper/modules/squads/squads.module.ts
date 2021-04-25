import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SquadsRoutingModule } from './squads-routing.module';
import { SquadsListComponent } from './views/squads-list/squads-list.component';
import { SquadsFormComponent } from './views/squads-form/squads-form.component';
import { SquadsMembersListComponent } from './views/squads-members-list/squads-members-list.component';
import { SquadsMembersFormComponent } from './views/squads-members-form/squads-members-form.component';
import { SquadsComponent } from './views/squads/squads.component';
import { PipesModule } from 'src/app/shared/pipes/pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';
import { FormModule } from 'src/app/shared/components/form/form.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ListModule } from 'src/app/shared/components/list/list.module';
import { TableModule } from 'src/app/shared/components/table/table.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SquadDialogComponent } from './components/squad-dialog/squad-dialog.component';
import { SquadMemberDialogComponent } from './components/squad-member-dialog/squad-member-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { RadiobuttonModule } from 'src/app/shared/components/radiobutton/radiobutton.module';
import { AutocompleteModule } from 'src/app/shared/components/autocomplete/autocomplete.module';
import { SquadOrgViewComponent } from './views/squad-org-view/squad-org-view.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SquadsListComponent,
    SquadsFormComponent,
    SquadsMembersListComponent,
    SquadsMembersFormComponent,
    SquadsComponent,
    SquadDialogComponent,
    SquadMemberDialogComponent,
    SquadOrgViewComponent
  ],
  imports: [
    CommonModule,
    SquadsRoutingModule,

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
export class SquadsModule { }
