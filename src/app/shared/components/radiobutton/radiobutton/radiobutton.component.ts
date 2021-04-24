import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radiobutton',
  templateUrl: './radiobutton.component.html',
  styleUrls: ['./radiobutton.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadiobuttonComponent implements OnInit {

  @Input('control') formControl?: FormControl;
  @Input('options') options: Array<RadiobuttonData> = [];
  @Input('vertical') isVertical: boolean = false;
  @Input('radiobuttonLabel') radiobuttonLabel: string = '';
  @Output('onChange') onChangeEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChangeRadiobutton(value) {
    this.onChangeEventEmitter.emit(value);
  }

}

export interface RadiobuttonData {
  label: string;
  value: any;
}
