import { Component, OnInit, Input } from '@angular/core';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() title = '';

  @Input('loading') isLoading = false;

  @Input() showConfirmLabel?: boolean;
  @Input() confirmLabel?: string;

  @Input() showCancelLabel = true;
  @Input() cancelLabel = 'Back';

  @Input() data: any;
  @Input() rows: Array<DialogData> = [];

  constructor() { }

  ngOnInit() {
  }

}

export interface DialogData {
  label: string;
  field?: (data: any) => any;
  width: string | number;
  pipe?: DynamicPipeOptions;
  pipeArgs?: (data: any) => any[];
  showDivider?: boolean;
  hasHighlight?: boolean;
  highlightClass?: (data: any) => string[]
}