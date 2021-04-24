import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadButtonComponent } from './file-upload-button/file-upload-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragAndDropUploadDirective } from './drag-and-drop/drag-and-drop-upload.directive';



@NgModule({
  declarations: [
    FileUploadButtonComponent,
    DragAndDropUploadDirective,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
  ],
  exports: [
    FileUploadButtonComponent,
    DragAndDropUploadDirective,
  ]
})
export class FileUploadModule { }
