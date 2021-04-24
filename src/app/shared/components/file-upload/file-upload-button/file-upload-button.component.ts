import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { UploadsService } from 'src/app/shared/services/uploads/uploads.service';
import { SnackbarUtilService } from 'src/app/shared/services/snackbar/snackbar-util.service';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';

@Component({
  selector: 'app-file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss']
})
export class FileUploadButtonComponent implements OnInit {

  isLoadingUpload: boolean = false;

  @ViewChild('upload', { static: true })
  uploadElement?: ElementRef;

  @Output('onUpload') onUploadEventEmitter: EventEmitter<{ url: string }> = new EventEmitter();

  constructor(
    private uploadsService: UploadsService,
    private messages: SnackbarUtilService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }


  onClickUpload() {
    this.uploadElement?.nativeElement.click();
  }

  onChangeUpload(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length) {
      const file = files[0];
      this.onFileUpload(file);
    }
  }

  onFileUpload(file: File) {
    const megaByte = 1000000;
    if (file.size > 5 * megaByte) {
      this.messages.showWarningMessage("The selected file is too large. The maximum size is 5MB");
    } else {
      this.isLoadingUpload = true;
      this.uploadsService.upload(file)
        .pipe(finalize(() => this.isLoadingUpload = false))
        .subscribe(
          (res: { url: string }) => {
            this.onUploadEventEmitter.emit(res);
            this.messages.showSuccessMessage('Successful upload!');
          },
          (err: HttpErrorResponse) => {
            this.errorHandler.httpErrorResponseHandler(err);
            if (this.uploadElement) {
              this.uploadElement.nativeElement.value = null;
            }
          }
        );
    }
  }

  onFileUploadDrop(files: FileList) {
    if (files.length > 0) {
      const file = files.item(0);
      if (file) {
        if (!(file.type).match("image")) {
          this.messages.showErrorMessage("Invalid file format");
          return;
        }

        this.onFileUpload(file);
      }
    }
  }
}
