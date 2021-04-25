import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, finalize, first, map, mergeMap } from 'rxjs/operators';
import { NewButtonListConfig } from 'src/app/shared/components/list/list/list.component';
import { ButtonClickEvent, TableButtonData } from 'src/app/shared/components/table/table-button/table-button.component';
import { SortOption } from 'src/app/shared/components/table/table/sort-option';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { ReleaseTrainResponsiblesService } from '../../../service/release-train-responsibles.service';

@Component({
  selector: 'app-release-trains-responsible-list',
  templateUrl: './release-trains-responsible-list.component.html',
  styleUrls: ['./release-trains-responsible-list.component.scss']
})
export class ReleaseTrainsResponsibleListComponent implements OnInit {

  columns: Array<TableColumn> = [];
  data$: BehaviorSubject<ReleaseTrainResponsibleResponse[]> = new BehaviorSubject<ReleaseTrainResponsibleResponse[]>([]);
  buttons: Array<TableButtonData> = [];

  isLoading: boolean = false;

  releaseTrain$!: Observable<string>;
  releaseTrainSubscription$?: Subscription;

  newButtonConfig: NewButtonListConfig = {
    label: 'Novo Responsável',
  }

  constructor(
    private service: ReleaseTrainResponsiblesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.buildTable();
    this.getReleaseTrain();
    this.findAll();
  }

  ngOnDestroy() {
    this.releaseTrainSubscription$?.unsubscribe();
  }

  private getReleaseTrain() {
    this.releaseTrain$ = this.activatedRoute.parent?.paramMap
      .pipe(
        filter(params => params.has("rt")),
        map(params => params.get("rt") as string)) as Observable<string>;

    this.releaseTrainSubscription$ = this.releaseTrain$.subscribe(releaseTrain => {
      this.newButtonConfig.url = `/rts/${releaseTrain}/responsaveis/novo`;
    })
  }

  private buildTable() {
    this.columns = [
      {
        name: 'id',
        header: 'Id',
        field: (data: ReleaseTrainResponsibleResponse) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'name',
        header: 'Nome',
        field: (data: ReleaseTrainResponsibleResponse) => data.employee?.name || '-',
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'role',
        header: 'Função',
        field: (data: ReleaseTrainResponsibleResponse) => data.role,
        pipe: DynamicPipeOptions.RELEASE_TRAIN_ROLE,
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
    this.releaseTrain$
      .pipe(
        first(),
        mergeMap(squad => this.service.findAll<ReleaseTrainResponsibleResponse>({}, squad)),
        finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as ReleaseTrainResponsibleResponse[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'edit':
        this.releaseTrain$
          .pipe(first())
          .subscribe(squad => this.router.navigate([`/rts/${squad}/responsaveis/${data.data.id}`]));
        break;

      case 'delete':
        this.releaseTrain$
          .pipe(
            first(),
            mergeMap(responsible => this.service.delete<ReleaseTrainResponsibleResponse>(data.data.id, responsible)))
          .subscribe(
            (response) => {
              this.data$.next(this.data$.value.filter(m => m.id !== response.id));
            },
            (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err));
        break;

      default:
        break;
    }
  }

}

interface ReleaseTrainResponsibleResponse {
  id: number;
  role: string;
  employee?: {
    id: number;
    name: string;
    email: string;
  }
  notes: string;
}


