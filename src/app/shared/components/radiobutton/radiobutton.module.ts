import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RadiobuttonComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  exports: [
    RadiobuttonComponent
  ]
})
export class RadiobuttonModule { }
