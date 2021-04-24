import { Component, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {

  @Input() placeholder = '';
  @Input() label?: string;
  @Input() control?: FormControl;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Output('onChange') onChangeEventEmitter: EventEmitter<ChipItem[]> = new EventEmitter();

  @Input() list: ChipItem[] = [];

  add(event: { input: HTMLInputElement | null; value: string }): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.list.push({ label: value.trim() });
    }
    if (this.control) {
      this.control.setValue(this.list);
    }
    this.onChangeEventEmitter.emit(this.list);

    if (input) {
      input.value = '';
    }
  }

  remove(item: ChipItem): void {
    const index = this.list.indexOf(item);
    if (index >= 0) {
      this.list.splice(index, 1);
    }

    if (this.control) {
      this.control.setValue(this.list);
    }
    this.onChangeEventEmitter.emit(this.list);
  }

}

export interface ChipItem {
  label: string;
  value?: any;
}
