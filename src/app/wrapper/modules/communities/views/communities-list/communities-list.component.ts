import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NewButtonListConfig } from 'src/app/shared/components/list/list/list.component';
import { TableButtonData, ButtonClickEvent } from 'src/app/shared/components/table/table-button/table-button.component';
import { SortOption } from 'src/app/shared/components/table/table/sort-option';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { CommunitiesService } from '../../service/communities.service';

@Component({
  selector: 'app-communities-list',
  templateUrl: './communities-list.component.html',
  styleUrls: ['./communities-list.component.scss']
})
export class CommunitiesListComponent implements OnInit {

  columns: Array<TableColumn> = [];
  data$: BehaviorSubject<any> = new BehaviorSubject([]);
  buttons: Array<TableButtonData> = [];

  isLoading: boolean = false;

  newButtonConfig: NewButtonListConfig = {
    label: 'Nova Comunidade',
    url: '/comunidades/nova'
  }

  constructor(
    private service: CommunitiesService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.buildTable();
    this.findAll();
  }

  private buildTable() {
    this.columns = [
      {
        name: 'id',
        header: 'Id',
        field: (data: CommunityResponse) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'name',
        header: 'Nome',
        field: (data: CommunityResponse) => data.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'responsible',
        header: 'Responsável',
        field: (data: CommunityResponse) => data.leader?.name || '-',
        sort: true,
        sortOption: SortOption.TEXT
      },
    ];


    this.buttons = [
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
      .findAll<CommunityResponse>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as CommunityResponse[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'edit':
        this.router.navigate([`/comunidades/${data.data.id}`]);
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

}

interface CommunityResponse {
  id: number;
  name: string;
  leader?: {
    id: number;
    name: string;
  };
}