import { Directive, HostBinding, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDragAndDropUpload]'
})
export class DragAndDropUploadDirective {

  @Output() onFileUpload: EventEmitter<FileList> = new EventEmitter();

  @HostBinding('style.background-color') background = '#fff'
  @HostBinding('style.opacity') opacity = '1'

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#F5F5F5';
    this.opacity = '0.8'
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff'
    this.opacity = '1'
  }

  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileUpload.emit(files)
    }
  }

}
