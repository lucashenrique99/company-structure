import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends ApiService {

  getUri() {
    return 'employees';
  }

}
