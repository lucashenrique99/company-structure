import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '../../pipes/pipes/pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    PipesModule,
    FlexLayoutModule,
    MatIconModule,

  ],
  exports: [
    DialogComponent
  ]
})
export class DialogModule { }
