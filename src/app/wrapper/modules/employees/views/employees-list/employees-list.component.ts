import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';
import { NewButtonListConfig } from 'src/app/shared/components/list/list/list.component';
import { ButtonClickEvent, TableButtonData } from 'src/app/shared/components/table/table-button/table-button.component';
import { SortOption } from 'src/app/shared/components/table/table/sort-option';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { EmployeeDialogComponent } from '../../components/employee-dialog/employee-dialog.component';
import { EmployeesService } from '../../service/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

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
        map(params => params.get("id"),
          filter(id => id !== null))
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
        name: 'email',
        header: 'Email',
        field: (data: any) => data.email,
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
      {
        id: 'edit',
        fontSet: 'fas',
        icon: 'fa-edit',
        label: 'Editar',
      },
      {
        id: 'deactivate',
        fontSet: 'fas',
        icon: 'fa-trash-alt',
        label: 'Desativar',
      },
    ];
  }

  private findAll(): void {
    this.isLoading = true;
    this.service
      .findAll<EmployeeProjection>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as EmployeeProjection[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'edit':
        this.router.navigate([`/funcionarios/${data.data.id}`]);
        break;

      case 'details':
        const id = data.data.id;
        this.router.navigate([], {
          queryParams: { id },
          relativeTo: this.activatedRoute
        });
        break;

      case 'delete':
        this.service.delete(data.data.id)
          .subscribe(
            (response: any) => {
              data.data.status = response.status;
              this.data$.next(this.data$.value);
            },
            (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err));
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

interface EmployeeProjection {
  id: number;
  name: string;
  email: string;
}