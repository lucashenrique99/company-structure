import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TableDataSource } from './table-datasource';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map, shareReplay, debounceTime } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ButtonClickEvent, TableButtonData } from '../table-button/table-button.component';
import { Sort } from '@angular/material/sort';
import { TableColumn } from './table-column';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AdvancedFilterType } from './advanced-filter-type';
import { DynamicPipe } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
import { ChipItem, ChipsComponent } from '../../chips/chips/chips.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource?: TableDataSource;

  // responsive selectors
  isExpanded$?: Observable<boolean>;

  // datas table
  displayedColumns: Array<string> = [];
  @Input('columns') columns: Array<TableColumn> = [];
  @Input('data') data$?: BehaviorSubject<any>;

  // filter
  @Input('filterPlaceholder') placeholder = 'Digite sua pesquisa aqui...';
  @Input('filter') showFilter = true;
  @Input('filterType') filterType: OperationType = OperationType.CLIENT_SIDE;
  @Output('onFilter') onFilterEventEmitter: EventEmitter<string | string[]> = new EventEmitter();

  // advanced filter
  advancedFilters?: FormArray;
  @Input('advancedFilter') showAdvancedFilter = false;
  @Input('advancedFilterType') advancedFilterType: OperationType = OperationType.CLIENT_SIDE;
  @Output('onAdvancedFilter') onAdvancedFilterEventEmitter: EventEmitter<any> = new EventEmitter();

  // sort
  @Input('sortType') sortType: OperationType = OperationType.CLIENT_SIDE;
  @Output('onSort') onSortEventEmitter: EventEmitter<Sort> = new EventEmitter();

  // pagination
  @Input('paginator') showPaginator = true;
  @Input('paginatorType') paginatorType: OperationType = OperationType.CLIENT_SIDE;
  @Output('onPage') onPageEventEmitter: EventEmitter<PageEvent> = new EventEmitter();

  // styles
  @Input('flat') flatTable = true;

  // message
  @Input('emptyMessage') emptyMessage = 'Nenhum registro foi encontrado';

  // loading
  @Input('loading') isLoading = false;

  // title
  @Input('title') title?: string;
  @Input('expandedTitle') showExpandedTitle?: boolean;

  // buttons
  @Input('showButtons') showButtons?: boolean;
  @Input('plainButtons') plainButtons = 3;
  @Input('buttons') tableButtons: Array<TableButtonData> = [];
  @Output('onTableButtonClick') onTableButtonClickEventEmitter: EventEmitter<ButtonClickEvent> = new EventEmitter<ButtonClickEvent>();

  // subscriptions
  subscriptions$: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private dynamicPipe: DynamicPipe
  ) { }

  ngOnInit() {
    const data$ = this.data$ || new BehaviorSubject([]);
    this.dataSource = new TableDataSource(data$, this.columns, this.dynamicPipe);
    if (this.columns) {
      this.displayedColumns = this.columns.map(c => c.name);

      if (this.showButtons) {
        this.displayedColumns.push('buttons');
      }
    }

    this.isExpanded$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(result => !result.matches),
        shareReplay()
      );

    if (this.showAdvancedFilter) {

      const formArrayColumns = this.columns.filter(c => c.filter != undefined && c.filter != null)
        .map(column => this.fb.group({
          selected: [false],
          column,
          filters: this.fb.group({
            text: [null],
            status: [null],
            initDate: [null],
            finalDate: [null],
            initNum: [null],
            finalNum: [null],
            initCur: [null],
            finalCur: [null],
          })
        }));

      this.advancedFilters = this.fb.array(formArrayColumns);

      const subs$ = this.advancedFilters
        .valueChanges
        .pipe(debounceTime(300))
        .subscribe(() => this.onChangeAdvancedFilter());

      this.subscriptions$.push(subs$);
    }
  }

  ngOnDestroy() {
    this.subscriptions$.forEach(s => s.unsubscribe());
  }

  ngAfterViewInit() {
    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.initPaginator(this.paginatorType);
    }
  }

  onChangeChipFilter(words: ChipItem[]) {
    if (this.filterType === OperationType.CLIENT_SIDE) {
      const search = words && words.length ? words.map(i => i.label) : [''];
      
      if(this.dataSource){
        this.dataSource.onFilterData(search);
      }
    }
    this.onFilterEventEmitter.emit(words.map(i => i.label));
  }

  onChangeAdvancedFilter() {
    const advancedFilter = this.advancedFilters?.getRawValue() || [];
    if (this.advancedFilterType === OperationType.CLIENT_SIDE && this.dataSource) {
      this.dataSource.onAdvancedFilterData(advancedFilter);
    }
    this.onAdvancedFilterEventEmitter.emit(advancedFilter);
  }

  showAdvancedColumn(group: FormGroup, id: string) {
    if (this.advancedFilters && group.get('selected')?.value) {
      const column = group.get('column')?.value;
      switch (id) {
        case 'text':
          return column.filter === AdvancedFilterType.TEXT;
        case 'status':
          return column.filter === AdvancedFilterType.STATUS;
        case 'initDate':
        case 'finalDate':
          return column.filter === AdvancedFilterType.DATE;
        case 'initNum':
        case 'finalNum':
          return column.filter === AdvancedFilterType.NUMBER;
        case 'initCur':
        case 'finalCur':
          return column.filter === AdvancedFilterType.CURRENCY;
      }
    }
    return false;
  }

  getAdvancedColumnLabel(group: FormGroup, id: string) {
    if (this.advancedFilters) {
      const column = group.get('column')?.value;
      switch (id) {
        case 'text':
          return column.filter === AdvancedFilterType.TEXT ? column.header : '';

        case 'status':
          return column.filter === AdvancedFilterType.STATUS ? column.header : '';

        case 'initDate':
          return column.filter === AdvancedFilterType.DATE ? `${column.header} - Início` : '';
        case 'finalDate':
          return column.filter === AdvancedFilterType.DATE ? `${column.header} - Fim` : '';

        case 'initNum':
          return column.filter === AdvancedFilterType.NUMBER ? `${column.header} - Valor Inicial` : '';
        case 'finalNum':
          return column.filter === AdvancedFilterType.NUMBER ? `${column.header} - Valor Final` : '';

        case 'initCur':
          return column.filter === AdvancedFilterType.CURRENCY ? `${column.header} - Valor Inicial (R$)` : '';

        case 'finalCur':
          return column.filter === AdvancedFilterType.CURRENCY ? `${column.header} - Valor Final (R$)` : '';
      }
    }
    return '';
  }

  showColumnOptions(control: FormGroup): boolean {
    const column = control.get('column')?.value as TableColumn;
    return column.showFilterOptions || false;
  }

  getColumnOptions(control: FormGroup): Array<string> {
    const column = control.get('column')?.value;
    return this.dataSource?.getColumnOptions(column) || [];
  }

  onClickColumnOption(option: string, component: ChipsComponent) {
    if (component instanceof ChipsComponent) {
      component.add({ input: null, value: option });
    }
  }

  onPage(pagination: PageEvent) {
    if (this.paginatorType === OperationType.CLIENT_SIDE && this.dataSource) {
      this.dataSource.onPaginateData(pagination);
    }
    this.onPageEventEmitter.emit(pagination);
  }

  onSort(sort: Sort) {
    if (this.sortType === OperationType.CLIENT_SIDE && this.dataSource) {
      this.dataSource.onSortData(sort);
    }
    this.onSortEventEmitter.emit(sort);
  }

  onTableButtonClick(data: ButtonClickEvent) {
    this.onTableButtonClickEventEmitter.emit(data);
  }

  ngForTrackByColumns(index: number, item: TableColumn) {
    return item.header;
  }
}

export enum OperationType {
  CLIENT_SIDE = 'client',
  SERVER_SIDE = 'server',
}