import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TogglePasswordButtonComponent } from './toggle-password-button/toggle-password-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    TogglePasswordButtonComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [
    TogglePasswordButtonComponent
  ]
})
export class ButtonsModule { }
