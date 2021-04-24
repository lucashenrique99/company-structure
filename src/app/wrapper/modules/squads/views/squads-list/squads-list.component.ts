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
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SquadDialogComponent } from '../../components/squad-dialog/squad-dialog.component';
import { SquadsService } from '../../service/squads.service';

@Component({
  selector: 'app-squads-list',
  templateUrl: './squads-list.component.html',
  styleUrls: ['./squads-list.component.scss']
})
export class SquadsListComponent implements OnInit {

  columns: Array<TableColumn> = [];
  data$: BehaviorSubject<any> = new BehaviorSubject([]);
  buttons: Array<TableButtonData> = [];

  isLoading: boolean = false;

  newButtonConfig: NewButtonListConfig = {
    label: 'Nova Squad',
    url: '/squads/nova'
  }

  constructor(
    private service: SquadsService,
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
        field: (data: SquadProjection) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'name',
        header: 'Nome',
        field: (data: SquadProjection) => data.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'projectCode',
        header: 'Código Jira',
        field: (data: SquadProjection) => data.projectCode,
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
        id: 'members',
        fontSet: 'fas',
        icon: 'fa-users',
        label: 'Membros'
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
      .findAll<SquadProjection>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as SquadProjection[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'edit':
        this.router.navigate([`/squads/${data.data.id}`]);
        break;

      case 'members':
        this.router.navigate([`/squads/${data.data.id}/membros`]);
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
      .open(SquadDialogComponent, { data: { id: id } })
      .afterClosed()
      .subscribe(() => this.router.navigate([], {
        queryParams: {},
        relativeTo: this.activatedRoute
      }));
  }

}

interface SquadProjection {
  id: number;
  name: string;
  projectCode: string;
}
