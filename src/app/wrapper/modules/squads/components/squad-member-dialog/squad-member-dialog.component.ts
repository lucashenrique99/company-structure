import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { DialogData } from 'src/app/shared/components/dialog/dialog/dialog.component';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SquadMembersService } from '../../service/squad-members.service';

@Component({
  selector: 'app-squad-member-dialog',
  templateUrl: './squad-member-dialog.component.html',
  styleUrls: ['./squad-member-dialog.component.scss']
})
export class SquadMemberDialogComponent implements OnInit {

  member!: SquadMemberResponse;
  rows: Array<DialogData> = [];

  isLoading: boolean = false;

  dialogTitle: string = 'Membro';


  constructor(
    private service: SquadMembersService,
    private errorHandler: ErrorHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, squad: string }
  ) { }

  ngOnInit() {
    this.buildDialogRows();
    this.getData();
  }

  private buildDialogRows() {
    this.rows = [
      {
        label: 'Nome',
        field: (data: SquadMemberResponse) => data.name,
        width: 50,
      },
      {
        label: 'Cargo',
        field: (data: SquadMemberResponse) => data.role,
        pipe: DynamicPipeOptions.SQUAD_ROLE,
        width: 50,
      },
      {
        label: 'Externo',
        field: (data: SquadMemberResponse) => data.isExternal ? 'Sim' : 'Não',
        width: 50
      },
      {
        label: 'Email Funcionário',
        field: (data: SquadMemberResponse) => data.employee?.email || '-',
        width: 50
      },
      {
        label: 'Observações',
        field: (data: SquadMemberResponse) => data.notes,
        width: 100,
      },

    ];
  }


  private getData() {
    this.isLoading = true;
    this.service.findById<SquadMemberResponse>(this.data.id, {}, this.data.squad)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        member => {
          this.member = member;
          this.dialogTitle = member.name;
        },
        (err: HttpErrorResponse) => this.errorHandler.httpErrorResponseHandler(err)
      );
  }

}

interface SquadMemberResponse {
  id?: number;
  name: string;
  role: string;
  isExternal: boolean;
  employee?: {
    id: number;
    name: string;
    email: string;
  };
  notes?: string;
}
