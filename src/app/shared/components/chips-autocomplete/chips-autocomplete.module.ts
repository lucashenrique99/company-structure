import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsAutocompleteComponent } from './chips-autocomplete/chips-autocomplete.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChipsAutocompleteComponent
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  exports: [
    ChipsAutocompleteComponent
  ]
})
export class ChipsAutocompleteModule { }
