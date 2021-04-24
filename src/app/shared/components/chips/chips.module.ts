import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips/chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ChipsComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,

  ],
  exports: [
    ChipsComponent
  ]
})
export class ChipsModule { }
