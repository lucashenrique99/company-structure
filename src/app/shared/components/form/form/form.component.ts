import { Component, OnInit, Output, Input, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit {

  @Input() title?: string;
  @Input() form?: FormGroup;
  @Input() showSpinner?: boolean;
  @Input() disableButton?: boolean;
  @Output('onSave') onSaveEventEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleOnSave(){
    this.onSaveEventEmitter.emit(true);
  }

}
