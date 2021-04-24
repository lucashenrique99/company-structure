import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss']
})
export class ChipsAutocompleteComponent implements OnInit {

  @Input() placeholder = '';
  @Input() label?: string;
  @Input() control?: FormControl;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('inputElement', { static: false })
  inputElementRef?: ElementRef;

  @Output('onChange') onChangeEventEmitter: EventEmitter<ChipItem[]> = new EventEmitter();

  @Input() list: ChipItem[] = [];

  optionsControl: FormControl = new FormControl();
  @Input() options: string[] = [];
  filteredOptions$: Observable<string[]> = of([]);

  ngOnInit() {
    this.filteredOptions$ = this.optionsControl.valueChanges
      .pipe(
        startWith(null),
        map((text: string | null) => text ? this.filterOptionsHandler(text) : this.options.slice()));
  }

  add(event: MatChipInputEvent): void {
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

    this.optionsControl.setValue(null);
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

  selected(event: MatAutocompleteSelectedEvent): void {
    this.list.push({ label: event.option.value });
    if(this.inputElementRef){
      this.inputElementRef.nativeElement.value = '';
    }
    
    this.optionsControl.setValue(null);

    if (this.control) {
      this.control.setValue(this.list);
    }
    this.onChangeEventEmitter.emit(this.list);
  }

  private filterOptionsHandler(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options
      .filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}

export interface ChipItem {
  label: string;
  value?: any;
}
