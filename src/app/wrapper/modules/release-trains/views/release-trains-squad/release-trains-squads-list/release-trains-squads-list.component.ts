import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map, first, mergeMap, finalize } from 'rxjs/operators';
import { NewButtonListConfig } from 'src/app/shared/components/list/list/list.component';
import { TableButtonData, ButtonClickEvent } from 'src/app/shared/components/table/table-button/table-button.component';
import { SortOption } from 'src/app/shared/components/table/table/sort-option';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { ReleaseTrainSquadsService } from '../../../service/release-train-squads.service';

@Component({
  selector: 'app-release-trains-squads-list',
  templateUrl: './release-trains-squads-list.component.html',
  styleUrls: ['./release-trains-squads-list.component.scss']
})
export class ReleaseTrainsSquadsListComponent implements OnInit {

  columns: Array<TableColumn> = [];
  data$: BehaviorSubject<ReleaseTrainSquadResponse[]> = new BehaviorSubject<ReleaseTrainSquadResponse[]>([]);
  buttons: Array<TableButtonData> = [];

  isLoading: boolean = false;

  releaseTrain$!: Observable<string>;
  releaseTrainSubscription$?: Subscription;

  newButtonConfig: NewButtonListConfig = {
    label: 'Nova Squad',
  }

  constructor(
    private service: ReleaseTrainSquadsService,
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
      this.newButtonConfig.url = `/rts/${releaseTrain}/squads/nova`;
    })
  }

  private buildTable() {
    this.columns = [
      {
        name: 'id',
        header: 'Id',
        field: (data: ReleaseTrainSquadResponse) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'squad',
        header: 'Squad',
        field: (data: ReleaseTrainSquadResponse) => data.squad.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'responsible',
        header: 'Responsável',
        field: (data: ReleaseTrainSquadResponse) => data.responsible.employee.name,
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
        mergeMap(squad => this.service.findAll<ReleaseTrainSquadResponse>({}, squad)),
        finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as ReleaseTrainSquadResponse[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'edit':
        this.releaseTrain$
          .pipe(first())
          .subscribe(squad => this.router.navigate([`/rts/${squad}/squads/${data.data.id}`]));
        break;

      case 'delete':
        this.releaseTrain$
          .pipe(
            first(),
            mergeMap(responsible => this.service.delete<ReleaseTrainSquadResponse>(data.data.id, responsible)))
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

interface ReleaseTrainSquadResponse {
  id: number;
  squad: {
    id: number;
    name: string;
    projectCode: string;
  }
  responsible: {
    id: number;
    employee: {
      id: number;
      name: string;
      email: string;
    }
    role: string;
    notes: string;
  }
  notes: string;
}


