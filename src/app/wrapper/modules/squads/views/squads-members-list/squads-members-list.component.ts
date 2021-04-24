import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, finalize, first, map, mergeMap, startWith, tap } from 'rxjs/operators';
import { NewButtonListConfig } from 'src/app/shared/components/list/list/list.component';
import { ButtonClickEvent, TableButtonData } from 'src/app/shared/components/table/table-button/table-button.component';
import { SortOption } from 'src/app/shared/components/table/table/sort-option';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SquadMemberDialogComponent } from '../../components/squad-member-dialog/squad-member-dialog.component';
import { SquadMembersService } from '../../service/squad-members.service';

@Component({
  selector: 'app-squads-members-list',
  templateUrl: './squads-members-list.component.html',
  styleUrls: ['./squads-members-list.component.scss']
})
export class SquadsMembersListComponent implements OnInit, OnDestroy {

  columns: Array<TableColumn> = [];
  data$: BehaviorSubject<SquadMemberResponse[]> = new BehaviorSubject<SquadMemberResponse[]>([]);
  buttons: Array<TableButtonData> = [];

  isLoading: boolean = false;

  squad$!: Observable<string>;
  squadSubscription$?: Subscription;

  newButtonConfig: NewButtonListConfig = {
    label: 'Novo Membro',
  }

  constructor(
    private service: SquadMembersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.buildTable();
    this.getSquad();
    this.findAll();
    this.listenRoute();
  }

  ngOnDestroy() {
    this.squadSubscription$?.unsubscribe();
  }

  private getSquad() {
    this.squad$ = this.activatedRoute.parent?.paramMap
      .pipe(
        filter(params => params.has("squad")),
        map(params => params.get("squad") as string)) as Observable<string>;

    this.squadSubscription$ = this.squad$.subscribe(squad => {
      this.newButtonConfig.url = `/squads/${squad}/membros/novo`;
    })
  }

  private listenRoute(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        filter(params => params && params.has("membro")),
        map(params => params.get("membro"))
      )
      .subscribe(id => this.openDialog(id as string))
  }

  private buildTable() {
    this.columns = [
      {
        name: 'id',
        header: 'Id',
        field: (data: SquadMemberResponse) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'name',
        header: 'Nome',
        field: (data: SquadMemberResponse) => data.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'role',
        header: 'Função',
        field: (data: SquadMemberResponse) => data.role,
        pipe: DynamicPipeOptions.SQUAD_ROLE,
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
    this.squad$
      .pipe(
        first(),
        mergeMap(squad => this.service.findAll<SquadMemberResponse>({}, squad)),
        finalize(() => this.isLoading = false))
      .subscribe(
        (data) => this.data$.next(data as SquadMemberResponse[]),
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );

  }

  onTableButtonClick(data: ButtonClickEvent): void {
    switch (data.button) {
      case 'edit':
        this.squad$
          .pipe(first())
          .subscribe(squad => this.router.navigate([`/squads/${squad}/membros/${data.data.id}`]));
        break;

      case 'details':
        this.squad$.pipe(first())
          .subscribe(squad => {
            const membro = data.data.id;
            this.router.navigate([], {
              queryParams: { membro, squad },
              relativeTo: this.activatedRoute
            });
          });
        break;

      case 'delete':
        this.squad$
          .pipe(
            first(),
            mergeMap(squad => this.service.delete<SquadMemberResponse>(data.data.id, squad)))
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

  openDialog(id: string) {
    return this.dialog
      .open(SquadMemberDialogComponent, { data: { id: id } })
      .afterClosed()
      .subscribe(() => this.router.navigate([], {
        queryParams: {},
        relativeTo: this.activatedRoute
      }));
  }

}

interface SquadMemberResponse {
  id: number;
  name: string;
  role: string;
  isExternal: boolean;
  employee?: {
    id: number;
    name: string;
    email: string;
  }
  notes: string;
}

