import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
  ],
  exports: [
    EditorComponent
  ]
})
export class EditorModule { }
