import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService extends ApiService {

  getUri() {
    return 'communities';
  }
}
