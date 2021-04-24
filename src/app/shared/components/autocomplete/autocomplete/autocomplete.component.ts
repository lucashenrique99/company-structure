import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject, combineLatest, EMPTY } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnChanges {

  @Input() required = true;
  @Input() autoWidth = false;
  @Input() placeholder = '';
  @Input() errorMessage = '';
  @Input('control') formControl?: FormControl;
  @Input() options: Array<AutocompleteData> | Observable<Array<AutocompleteData>> = [];
  @Input('filterType') filterType: FilterType = FilterType.CLIENT_SIDE;

  @Output('onFilter') onFilterEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output('onSelect') onSelectEventEmitter: EventEmitter<any> = new EventEmitter();

  @Input('onlyValid') onlyValidValues = true;

  filteredOptions?: Observable<Array<AutocompleteData>>;

  options$: BehaviorSubject<AutocompleteData[]> = new BehaviorSubject<AutocompleteData[]>([]);

  constructor() { }

  ngOnInit() {
    if (this.filterType === FilterType.CLIENT_SIDE && this.formControl) {
      this.filteredOptions = combineLatest([
        this.formControl.valueChanges
          .pipe(
            startWith(this.formControl.value && this.formControl.value.label ? this.formControl.value.label : ''),
            filter(value => typeof value === 'string')),
        this.options$,
      ])
        .pipe(
          map(([text, options]) => {
            return options ? options.filter(option =>
              `${option.label}`.toLowerCase().includes(text.toLowerCase())) : []
          })
        )
    } else {
      this.filteredOptions = (this.options && this.options instanceof Observable) ? this.options : EMPTY;
    }

  }

  ngOnChanges() {
    if (this.filterType === FilterType.CLIENT_SIDE) {
      this.options$.next(this.options && this.options instanceof Array ? this.options : []);
    }
  }

  onKeyDownInput(event: any) {
    this.onFilterEventEmitter.emit(event);
  }

  displayLabelWith(value?: AutocompleteData): string | undefined {
    return value ? value.label : undefined;
  }

  onSelected(optionSelected: AutocompleteData) {
    if (!optionSelected) {
      return;
    }
    this.onSelectEventEmitter.emit(optionSelected.value);
  }

  onInputFocusOut() {
    if (this.onlyValidValues) {
      const value = this.formControl?.value;
      if (!value || !value.value) {
        this.formControl?.setValue(null);
      }
    }
  }

  hasError(error: string) {
    return this.formControl ? this.formControl.hasError(error) : false;
  }

}

export enum FilterType {
  CLIENT_SIDE = 'client',
  SERVER_SIDE = 'server'
}

export interface AutocompleteData {
  label: string;
  description?: string;
  value: any;
}