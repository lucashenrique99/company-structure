import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title?: string;
  @Input() message?: string;
  @Input('data') confirmData: any = { confirm: true };

  @Input() confirmMode: 'warning' | 'danger' = 'warning';

  constructor(@Inject(MAT_DIALOG_DATA) data: { title: string, message: string, confirmMode?: 'warning' | 'danger', confirmData?: any }) {
    if (data) {
      this.title = data.title;
      this.message = data.message;
      if (data.confirmData) {
        this.confirmData = data.confirmData;
      }
      if (data.confirmMode) {
        this.confirmMode = data.confirmMode;
      }
    }
  }

  ngOnInit() {
  }

}