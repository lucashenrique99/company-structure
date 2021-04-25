import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DialogData } from 'src/app/shared/components/dialog/dialog/dialog.component';
import { SortOption } from 'src/app/shared/components/table/table/sort-option';
import { TableColumn } from 'src/app/shared/components/table/table/table-column';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { ReleaseTrainsService } from '../../service/release-trains.service';

@Component({
  selector: 'app-release-train-dialog',
  templateUrl: './release-train-dialog.component.html',
  styleUrls: ['./release-train-dialog.component.scss']
})
export class ReleaseTrainDialogComponent implements OnInit {

  squadsColumns: TableColumn[] = [];
  squads$ = new BehaviorSubject<SquadResponse[]>([]);

  releaseTrain!: ReleaseTrainResponse;
  rows: Array<DialogData> = [];

  isLoading: boolean = false;

  dialogTitle: string = 'RT';

  constructor(
    private service: ReleaseTrainsService,
    private errorHandler: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) { }

  ngOnInit() {
    this.buildDialogRows();
    this.getData();
    this.buildSquadsTable();
  }

  private buildDialogRows() {
    this.rows = [

      {
        label: 'Nome',
        field: (data: ReleaseTrainResponse) => data.name,
        width: 50,
      },
      {
        label: 'Líder',
        field: (data: ReleaseTrainResponse) => data.leader?.employee.name || '-',
        width: 50,
      },
      {
        label: 'Observações',
        field: (data: ReleaseTrainResponse) => data.notes,
        width: 100,
      },

    ];
  }


  private getData() {
    this.isLoading = true;
    this.service.findById<ReleaseTrainResponse>(this.data.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        releaseTrain => {
          this.releaseTrain = releaseTrain;
          this.squads$.next(releaseTrain.squads)
          this.dialogTitle = releaseTrain.name;
        },
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );
  }



  private buildSquadsTable() {
    this.squadsColumns = [
      {
        name: 'id',
        header: 'Id',
        field: (data: SquadResponse) => data.id,
        sort: true,
        sortOption: SortOption.NUMBER
      },
      {
        name: 'name',
        header: 'Nome',
        field: (data: SquadResponse) => data.squad.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'responsible',
        header: 'Responsável',
        field: (data: SquadResponse) => data.responsible.employee.name,
        sort: true,
        sortOption: SortOption.TEXT
      },
      {
        name: 'projectCode',
        header: 'Código Jira',
        field: (data: SquadResponse) => data.squad.projectCode,
        sort: true,
        sortOption: SortOption.TEXT
      },
    ];
  }
}

interface ReleaseTrainResponse {
  id?: number;
  name: string;
  isActive?: boolean;
  notes?: string;
  leader?: {
    id: number;
    employee: {
      id: number;
      name: string;
      email: string;
    }
    role: string;
    notes: string;
  }
  squads: SquadResponse[]
}

interface SquadResponse {
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