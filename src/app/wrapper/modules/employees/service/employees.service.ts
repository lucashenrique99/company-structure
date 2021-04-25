import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, PageApi } from 'src/app/shared/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends ApiService {

  getUri() {
    return 'employees';
  }

  findAllActivesByBirthDate<T>(map?: { [param: string]: string | string[] }): Observable<Array<T> | PageApi<T>> {
    const params = new HttpParams({ fromObject: map });
    return this.http.get<Array<T> | PageApi<T>>(`${this.apiUrl}/${this.getUri()}/birthdays-month`, { params });
  }

}
