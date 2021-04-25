import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseTrainRole'
})
export class ReleaseTrainRolePipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'LEADER': return 'Líder';
      case 'LTF': return 'Líder Técnico';
    }
    return 'Outro';
  }

}
