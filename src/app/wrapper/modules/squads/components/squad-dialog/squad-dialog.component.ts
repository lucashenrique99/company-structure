import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DialogData } from 'src/app/shared/components/dialog/dialog/dialog.component';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SquadsService } from '../../service/squads.service';

@Component({
  selector: 'app-squad-dialog',
  templateUrl: './squad-dialog.component.html',
  styleUrls: ['./squad-dialog.component.scss']
})
export class SquadDialogComponent implements OnInit {

  squad!: SquadResponse;
  rows: Array<DialogData> = [];

  isLoading: boolean = false;

  dialogTitle: string = 'Squad';

  members$ = new BehaviorSubject<{ name: string, role: string, isExternal: boolean }[]>([]);
  membersColumns: Array<TableColumn> = [];

  constructor(
    private service: SquadsService,
    private errorHandler: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit() {
    this.buildDialogRows();
    this.getData();
    this.buildMembersTable();
  }

  private buildDialogRows() {
    this.rows = [
      {
        label: 'Data de criação',
        field: (data) => data.createdDate,
        width: 50,
        pipe: DynamicPipeOptions.DATE,
        pipeArgs: (data: SquadResponse) => ['medium']
      },
      {
        label: 'Última modificação',
        field: (data: SquadResponse) => data.lastModifiedDate,
        width: 50,
        pipe: DynamicPipeOptions.DATE,
        pipeArgs: (data: SquadResponse) => ['medium']
      },
      {
        label: 'Nome',
        field: (data: SquadResponse) => data.name,
        width: 50,
      },
      {
        label: 'Código JIRA',
        field: (data: SquadResponse) => data.projectCode,
        width: 50,
      },
      {
        label: 'Observações',
        field: (data: SquadResponse) => data.notes,
        width: 100,
      },

    ];
  }

  private buildMembersTable() {
    this.membersColumns = [
      {
        header: "Funcionário",
        name: 'member',
        field: (data) => data.name
      },
      {
        header: "Cargo",
        name: 'role',
        field: (data) => data.role,
        pipe: DynamicPipeOptions.SQUAD_ROLE
      },
      {
        header: "Externo",
        name: 'isExternal',
        field: (data) => data.isExternal ? 'Sim' : 'Não'
      },
    ]
  }

  private getData() {
    this.isLoading = true;
    this.service.findById<SquadResponse>(this.data.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        squad => {
          this.squad = squad;
          this.members$.next(squad.members)
          this.dialogTitle = squad.name;
        },
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );
  }

}

interface SquadResponse {
  id?: number;
  name: string;
  projectCode?: string;
  notes?: string;
  lastModifiedDate: string;
  createdDate: string;
  members: {
    name: string;
    role: string;
    isExternal: boolean
  }[]
}