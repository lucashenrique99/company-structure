import { Pipe, PipeTransform, Injector } from '@angular/core';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { StatusPipe } from './status.pipe';
import { MaskPipe } from 'ngx-mask';
import { ActivePipe } from './active.pipe';
import { MaxLengthPipe } from './max-length.pipe';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {

  constructor(private injector: Injector) { }

  transform(value: any, pipe?: DynamicPipeOptions, args: any[] = []): any {
    if (!pipe) {
      return value;
    }
    switch (pipe) {
      case DynamicPipeOptions.CURRENCY:
        return this.injector.get(CurrencyPipe).transform(value, 'USD');
      case DynamicPipeOptions.DATE:
        return this.injector.get(DatePipe).transform(value, args[0], args[1]);
      case DynamicPipeOptions.PERCENT:
        return this.injector.get(PercentPipe).transform(value, args[0], args[1]);
      case DynamicPipeOptions.STATUS:
        return this.injector.get(StatusPipe).transform(value);
      case DynamicPipeOptions.MASK:
        return this.injector.get(MaskPipe).transform(value, args[0], args[1]);
      case DynamicPipeOptions.ACTIVE:
        return this.injector.get(ActivePipe).transform(value);
      case DynamicPipeOptions.MAX_LENGHT:
        return this.injector.get(MaxLengthPipe).transform(value, args[0]);
      default:
        value;
    }
  }

}

export enum DynamicPipeOptions {
  CURRENCY = 'CURRENCY',
  DATE = 'DATE',
  STATUS = 'STATUS',
  MASK = 'MASK',
  PERCENT = 'PERCENT',
  ACTIVE = 'ACTIVE',
  MAX_LENGHT = 'MAX_LENGHT',
}