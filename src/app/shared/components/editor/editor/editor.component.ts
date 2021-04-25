import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { UploadsService } from 'src/app/shared/services/api/uploads/uploads.service';
import * as ClassicEditor from 'src/assets/plugins/ckeditor/ckeditor.js';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy {

  public editor: any;
  editorConfig!: any;

  @Input('control') control!: FormControl;

  subscripions$: Subscription[] = [];

  constructor(private uploadService: UploadsService) { }

  ngOnInit(): void {
    this.editor = ClassicEditor;

    const uploadSettings = this.uploadService.getUploadSettings();
    this.editorConfig = {
      simpleUpload: {
        uploadUrl: uploadSettings.url,
        headers: uploadSettings.headers
      }
    }

  }

  onEditorReady(editor: any) {
    if (this.control) {
      const subs$ = this.control.valueChanges
        .pipe(startWith(this.control.value || ''))
        .subscribe(value => editor.setData(value));
      this.subscripions$.push(subs$);
    }
  }

  ngOnDestroy() {
    this.subscripions$.forEach(s => s.unsubscribe());
  }

  onEditorChange({ editor }: ChangeEvent) {
    if (editor && this.control) {
      this.control.setValue(editor.getData(), { emitEvent: false });
    }
  }

}
