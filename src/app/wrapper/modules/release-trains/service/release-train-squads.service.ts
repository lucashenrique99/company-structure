import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReleaseTrainSquadsService extends ApiService {

  getUri(releaseTrain: string) {
    return `release-trains/${releaseTrain}/squads`;
  }
}
