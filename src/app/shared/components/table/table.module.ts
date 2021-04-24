import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { TableButtonComponent } from './table-button/table-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from '../../pipes/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChipsModule } from '../chips/chips.module';
import { ChipsAutocompleteModule } from '../chips-autocomplete/chips-autocomplete.module';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    TableComponent,
    TableButtonComponent,
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTooltipModule,
    MatChipsModule,
    MatProgressBarModule,
    PipesModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ChipsModule,
    ChipsAutocompleteModule,
    MatSortModule,

  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }
