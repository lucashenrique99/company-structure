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
import { ReleaseTrainDialogComponent } from '../../components/release-train-dialog/release-train-dialog.component';
import { ReleaseTrainsService } from '../../service/release-trains.service';

@Component({
  selector: 'app-release-trains-list',
  templateUrl: './release-trains-list.component.html',
  styleUrls: ['./release-trains-list.component.scss']
})
export class ReleaseTrainsListComponent implements OnInit {

  columns: Array<TableColumn> = [];
  data$: BehaviorSubject<any> = new BehaviorSubject([]);
  buttons: Array<TableButtonData> = [];

  isLoading: boolean = false;

  newButtonConfig: NewButtonListConfig = {
    label: 'Nova RT',
    url: '/rts/nova'
  }

  constructor(
    private service: ReleaseTrainsService,
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
        field: (data: ReleaseTrainProjection) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'name',
        header: 'Nome',
        field: (data: ReleaseTrainProjection) => data.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'responsible',
        header: 'Responsável',
        field: (data: ReleaseTrainProjection) => data.leader?.employee.name || '-',
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
        id: 'responsible',
        fontSet: 'fas',
        icon: 'fa-user-tie',
        label: 'Responsáveis'
      },
      {
        id: 'squads',
        fontSet: 'fas',
        icon: 'fa-user-friends',
        label: 'Squads'
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
      .findAll<ReleaseTrainProjection>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as ReleaseTrainProjection[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'edit':
        this.router.navigate([`/rts/${data.data.id}`]);
        break;

      case 'responsible':
        this.router.navigate([`/rts/${data.data.id}/responsaveis`]);
        break;

      case 'squads':
        this.router.navigate([`/rts/${data.data.id}/squads`]);
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
      .open(ReleaseTrainDialogComponent, { data: { id: id } })
      .afterClosed()
      .subscribe(() => this.router.navigate([], {
        queryParams: {},
        relativeTo: this.activatedRoute
      }));
  }

}

interface ReleaseTrainProjection {
  id: number;
  name: string;
  leader?: {
    id: number;
    employee: {
      name: string;
    }
  };
}
