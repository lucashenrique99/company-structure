import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.scss']
})
export class TableButtonComponent implements OnInit {

  @Input('data') data: any;
  @Input('plainButtons') plainButtonsSize = 3;
  @Input() buttons: Array<TableButtonData>;
  @Output('onClick') onClickEventEmitter: EventEmitter<ButtonClickEvent> = new EventEmitter();

  plainButtons: Array<TableButtonData> = [];
  menuButtons: Array<TableButtonData> = [];

  constructor() {
    this.buttons = [
      {
        id: 'edit',
        fontSet: 'fas',
        icon: 'fa-edit',
        label: 'Editar',
      },
      {
        id: 'search',
        fontSet: 'fas',
        icon: 'fa-search',
        label: 'Mais Detalhes'
      },
      {
        id: 'delete',
        fontSet: 'fas',
        icon: 'fa-trash-alt',
        label: 'Excluir'
      }
    ];
  }

  ngOnInit() {
    if (this.buttons) {
      const size = Math.min(this.buttons.length, this.plainButtonsSize);
      this.plainButtons = this.buttons.slice(0, size);
      this.menuButtons = this.buttons.slice(size);
    }

  }

  onClick(buttonId: string) {
    this.onClickEventEmitter.emit({ button: buttonId, data: this.data })
  }

  ngForTrackByButton(index: number, item: TableButtonData) {
    return item.id;
  }

}

export interface ButtonClickEvent {
  button: string;
  data: any;
}

export interface TableButtonData {
  id: string;
  label?: string;
  icon?: string;
  svgIcon?: string;
  fontSet?: string;
  class?: string;
  isLink?: boolean;
  link?(data?: any): string[];
  linkParams?(data?: any): { [k: string]: any };
  disabled?(data?: any): boolean;
}
