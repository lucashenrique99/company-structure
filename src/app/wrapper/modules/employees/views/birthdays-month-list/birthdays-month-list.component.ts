import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, map, finalize } from 'rxjs/operators';
import { NewButtonListConfig } from 'src/app/shared/components/list/list/list.component';
import { TableButtonData, ButtonClickEvent } from 'src/app/shared/components/table/table-button/table-button.component';
import { SortOption } from 'src/app/shared/components/table/table/sort-option';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { EmployeeDialogComponent } from '../../components/employee-dialog/employee-dialog.component';
import { EmployeesService } from '../../service/employees.service';

@Component({
  selector: 'app-birthdays-month-list',
  templateUrl: './birthdays-month-list.component.html',
  styleUrls: ['./birthdays-month-list.component.scss']
})
export class BirthdaysMonthListComponent implements OnInit {


  columns: Array<TableColumn> = [];
  data$: BehaviorSubject<any> = new BehaviorSubject([]);
  buttons: Array<TableButtonData> = [];

  isLoading: boolean = false;

  newButtonConfig: NewButtonListConfig = {
    label: 'Novo Funcionário',
    url: '/funcionarios/novo'
  }

  constructor(
    private service: EmployeesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.buildTable();
    this.findAll();
    this.listenRoute();
  }

  private listenRoute(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        filter(params => params && params.has("id")),
        map(params => params.get("id"))
      )
      .subscribe(id => this.openDialog(id as string))
  }

  private buildTable() {
    this.columns = [
      {
        name: 'id',
        header: 'Id',
        field: (data: any) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'name',
        header: 'Nome',
        field: (data: any) => data.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'birthDate',
        header: 'Data de aniversário',
        field: (data: any) => data.birthDate,
        pipe: DynamicPipeOptions.DATE,
        pipeArgs: () => ['dd/MM'],
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'email',
        header: 'Email',
        field: (data: any) => data.email,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'phone',
        header: 'Celular',
        field: (data: any) => data.phone,
        pipe: DynamicPipeOptions.MASK,
        pipeArgs: () => ['(00) 0000-0000||(00) 0 0000-0000'],
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'corporatePhone',
        header: 'Celular Corporativo',
        field: (data: any) => data.corporatePhone,
        pipe: DynamicPipeOptions.MASK,
        pipeArgs: () => ['(00) 0000-0000||(00) 0 0000-0000'],
        sort: true,
        sortOption: SortOption.TEXT
      },
    ];


    this.buttons = [
      {
        id: 'details',
        fontSet: 'fas',
        icon: 'fa-search',
        label: 'Mais Detalhes'
      },
    ];
  }

  private findAll(): void {
    this.isLoading = true;
    this.service
      .findAllActivesByBirthDate<EmployeeResponse>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as EmployeeResponse[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'details':
        const id = data.data.id;
        this.router.navigate([], {
          queryParams: { id },
          relativeTo: this.activatedRoute
        });
        break;

      default:
        break;
    }
  }

  openDialog(id: string) {
    return this.dialog
      .open(EmployeeDialogComponent, { data: { id: id } })
      .afterClosed()
      .subscribe(() => this.router.navigate([], {
        queryParams: {},
        relativeTo: this.activatedRoute
      }));
  }

}

interface EmployeeResponse {
  id: number;
  name: string;
  email: string;
}
