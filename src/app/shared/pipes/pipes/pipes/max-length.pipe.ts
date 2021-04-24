import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string, length: number = 20): unknown {
    if (value) {
      if (value.length > length) {
        return `${value.substring(0, length)}...`
      }
      return value;
    }
    return null;
  }

}
