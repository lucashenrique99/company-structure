import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import * as moment from 'moment';
import { TableColumn } from './table-column';
import { SortOption } from './sort-option';
import { AdvancedFilterType } from './advanced-filter-type';
import { PageApi } from 'src/app/shared/services/api/api.service';
import { DynamicPipe } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';

export class TableDataSource extends DataSource<any> {

  paginator?: MatPaginator;
  sort?: MatSort;

  data: Array<any> = [];
  displayedData: Array<any> = [];

  paginationType: 'client' | 'server' = 'client';

  options: { column: TableColumn, options?: Array<string> }[] = [];

  currentFilter: string[] = [];
  currentAdvancedFilter: any[] = [];
  currentSort?: Sort;
  currentData?: any[] | PageApi<any>;

  constructor(
    private data$: BehaviorSubject<any>,
    private columns: Array<TableColumn>,
    private dynamicPipe: DynamicPipe
  ) {
    super();
  }

  connect(): Observable<any[]> {
    return this.data$
      .pipe(
        map((data: TableDataEvent | Array<any> | PageApi<any>) => {
          if (data instanceof TableDataEvent) {
            switch (data.id) {
              case 'filter':
                this.updatePaginator(this.displayedData.length, 0);
                break;
              case 'sort':
                this.updatePaginator(this.displayedData.length, 0);
                break;
              case 'page':
                this.updatePaginator(this.displayedData.length);
                break;
            }
            return data.data;

          } else if (data instanceof Array) {
            this.data = [...data];

            let transformedData = [...data];
            if (this.currentFilter) {
              transformedData = this.filterData(this.currentFilter);
            }
            if (this.currentAdvancedFilter) {
              transformedData = this.advancedFilterData(this.currentAdvancedFilter);
            }
            this.currentData = [...transformedData];

            const currentPage = this.paginator && this.paginator.pageIndex ? this.paginator.pageIndex : 0;
            this.updatePaginator(transformedData.length, currentPage);

            if (this.currentSort) {
              transformedData = this.sortData(this.currentSort, transformedData);
            }
            this.displayedData = transformedData;

            this.updateColumnOptions();
            return this.getPaginatedData([...this.displayedData]);

          } else {
            this.data = [...data.content];
            this.displayedData = [...data.content];
            this.currentData = { ...data };

            this.updateColumnOptions();

            if (this.paginator) {
              this.paginator.length = data.totalElements || 0;
              this.paginator.pageIndex = data.number || 0;
              this.paginator.pageSize = data.size || 0;
            }

            return data.content;
          }
        })
      );
  }

  disconnect() { }

  getColumnOptions(column: TableColumn) {
    const option = this.options ? this.options.find(c => c.column.name === column.name) : null;
    return option ? option.options : [];
  }

  updateColumnOptions() {
    this.options = [];
    this.columns.filter(column => column.showFilterOptions)
      .forEach(column => {
        const options = new Set<string>();
        this.data.forEach(d => {
          const value = !column.pipe ?
            `${column.field(d)}` :
            this.dynamicPipe.transform(
              column.field(d),
              column.pipe,
              column.pipeArgs ? column.pipeArgs(d) : []);
          options.add(value);
        });
        const sorted: string[] = [];
        options.forEach(option => sorted.push(option));
        sorted.sort((o1, o2) => o1.localeCompare(o2));
        this.options.push({ column, options: sorted });
      });
  }

  initPaginator(operationType: 'client' | 'server') {
    if (this.paginator) {
      this.paginationType = operationType;
      const length = this.currentData instanceof Array ?
        this.currentData.length : this.currentData?.totalElements || 0;
      this.onPaginateData({
        length,
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize
      });
      this.updatePaginator(length);
    }
  }

  updatePaginator(length: number, pageIndex?: number) {
    if (this.paginator) {
      if (pageIndex || pageIndex === 0) {
        const numPages = this.paginator.getNumberOfPages();
        this.paginator.pageIndex = Math.max(Math.min(pageIndex, numPages - 1), 0);
      }
      if (this.paginationType === 'client') {
        this.paginator.length = length;
      }
    }
  }

  onPaginateData(page: PageEvent) {
    const paged = this.getPaginatedData([...this.displayedData], page.pageIndex, page.pageSize);
    this.data$.next(new TableDataEvent('page', paged));
  }

  private getPaginatedData(data: Array<any>, pageIndex: number = 0, pageSize?: number) {
    if (this.paginator) {
      if (!pageSize) {
        pageSize = this.paginator.pageSize;
      }
      const startIndex = pageIndex * pageSize;
      return data.splice(startIndex, pageSize);
    }
    return data;
  }

  onFilterData(words: Array<string>): void {
    this.currentFilter = words;
    const filtered = this.filterData(words);
    this.displayedData = this.currentSort ? this.sortData(this.currentSort, filtered) : filtered;
    this.data$.next(new TableDataEvent('filter', this.getPaginatedData([...this.displayedData])));
  }

  private filterData(filter: string[]) {
    return this.data.filter(item => {
      for (const text of filter) {
        let contains = false;
        for (const column of this.columns) {
          const field = this.dynamicPipe.transform(
            column.field(item),
            column.pipe,
            column.pipeArgs ? column.pipeArgs(item) : []);

          if (`${field}`.toLowerCase().includes(text.toLowerCase())) {
            contains = true;
            break;
          }
        }
        if (!contains) {
          return false;
        }
      }
      return true;
    });
  }

  onAdvancedFilterData(filter: any[]): void {
    this.currentAdvancedFilter = filter;
    const selectedFilters: any[] = filter.filter(c => c.selected);

    const filtered = this.advancedFilterData(selectedFilters);
    this.displayedData = this.currentSort ? this.sortData(this.currentSort, filtered) : filtered;
    this.data$.next(new TableDataEvent('filter', this.getPaginatedData([...this.displayedData])));
  }

  private advancedFilterData(filters: any[]): any[] {
    return this.data.filter(item => {
      for (const selectedFilter of filters) {
        const column = selectedFilter.column;
        const filterValues = selectedFilter.filters;
        switch (column.filter) {
          case AdvancedFilterType.TEXT:
            filterValues.text = filterValues.text ? filterValues.text : [];
            for (const filterValue of filterValues.text) {
              const text = filterValue.label;
              const field = this.dynamicPipe.transform(
                column.field(item),
                column.pipe,
                column.pipeArgs ? column.pipeArgs(item) : []);

              if (!`${field}`.toLowerCase().includes(text.toLowerCase())) {
                return false;
              }
            }
            break;

          case AdvancedFilterType.STATUS:
            filterValues.status = filterValues.status ? filterValues.status : [];
            for (const filterValue of filterValues.status) {
              const text = filterValue.label;
              const field = this.dynamicPipe.transform(
                column.field(item),
                column.pipe,
                column.pipeArgs ? column.pipeArgs(item) : []);

              if (!`${field}`.toLowerCase().includes(text.toLowerCase())) {
                return false;
              }
            }
            break;

          case AdvancedFilterType.NUMBER:

            filterValues.initNum = filterValues.initNum !== null && filterValues.initNum !== undefined && !isNaN(filterValues.initNum) ?
              filterValues.initNum : -9999999999999999;
            filterValues.finalNum = filterValues.finalNum !== null && filterValues.finalNum !== undefined && !isNaN(filterValues.finalNum) ?
              filterValues.finalNum : 9999999999999999;

            if (column.field(item) < filterValues.initNum ||
              column.field(item) > filterValues.finalNum) {
              return false;
            }
            break;

          case AdvancedFilterType.CURRENCY:
            filterValues.initCur = filterValues.initCur !== null && filterValues.initCur !== undefined && !isNaN(filterValues.initCur) ?
              filterValues.initCur : -9999999999999999;
            filterValues.finalCur = filterValues.finalCur !== null && filterValues.finalCur !== undefined && !isNaN(filterValues.finalCur) ?
              filterValues.finalCur : 9999999999999999;

            if (column.field(item) < filterValues.initCur ||
              column.field(item) > filterValues.finalCur) {
              return false;
            }
            break;

          case AdvancedFilterType.DATE:
            filterValues.initDate = filterValues.initDate ? filterValues.initDate : moment('1950-01-01');
            filterValues.finalDate = filterValues.finalDate ? filterValues.finalDate : moment('2100-01-01');

            const columnDate = moment(column.field(item));
            if (!columnDate.isValid() ||
              columnDate.isBefore(filterValues.initDate) ||
              columnDate.isAfter(filterValues.finalDate)) {
              return false;
            }

            break;
        }
      }
      return true;

    });
  }

  onSortData(sort: Sort) {
    this.currentSort = sort;
    if (!sort.active || sort.direction === '') {
      return;
    }

    const sorted = this.sortData(sort);
    this.data$.next(new TableDataEvent('sort', this.getPaginatedData([...sorted])));
  }

  private sortData(sort: Sort, displayedData: any[] = this.displayedData): any[] {
    return displayedData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      const column = this.columns.find(c => c.name === sort.active);
      if (!column) {
        return 0;
      }

      return this.compare(a, b, isAsc, column);
    });
  }


  private compare(a: any, b: any, isAsc: boolean, column: TableColumn) {
    if (column.sortOption === SortOption.NUMBER) {
      const valueA = isNaN(column.field(a)) ? 1 : column.field(a);
      const valueB = isNaN(column.field(b)) ? 0 : column.field(b);
      return (valueA - valueB) * (isAsc ? 1 : -1);

    } else if (column.sortOption === SortOption.DATE) {
      const valueA = moment(column.field(a));
      const valueB = moment(column.field(b));

      if (valueA.isSame(valueB)) {
        return 0;
      } else if (valueA.isBefore(valueB)) {
        return 1 * (isAsc ? 1 : -1);
      }
      return -1 * (isAsc ? 1 : -1);

    } else { // default = text
      const valueA = this.dynamicPipe.transform(column.field(a), column.pipe, column.pipeArgs ? column.pipeArgs(a) : []);
      const valueB = this.dynamicPipe.transform(column.field(b), column.pipe, column.pipeArgs ? column.pipeArgs(b) : []);
      return (valueA < valueB ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}

class TableDataEvent {

  id: string;
  data: Array<any>;

  constructor(id: string, data: Array<any>) {
    this.id = id;
    this.data = data;
  }
}