import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SquadMembersService extends ApiService {

  getUri(squad: string) {
    return `squads/${squad}/members`;
  }

}
