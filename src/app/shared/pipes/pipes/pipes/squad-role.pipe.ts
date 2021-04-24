import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'squadRole'
})
export class SquadRolePipe implements PipeTransform {

  transform(value: string): string {
    switch(value) {
      case 'TEAM_LEAD': return 'Team Lead';
      case 'TECH_LEAD': return 'Tech Lead';
      case 'PRODUCT_OWNER': return 'Product Owner';
      case 'ENGINEER': return 'Engenheiro(a)';
      case 'TESTER': return 'Tester';
      case 'DESIGNER': return 'Designer';
    }
    return 'Outro';
  }

}