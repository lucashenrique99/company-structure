import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  protected readonly apiUrl: string;

  constructor(
    protected http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
  }

  protected abstract getUri(): string;

  save<req, resp>(value: req): Observable<resp> {
    if ((value as any).id) {
      return this.update(value, (value as any).id);
    } else {
      return this.create(value);
    }
  }

  create<req, resp>(value: req): Observable<resp> {
    return this.http.post<resp>(`${this.apiUrl}/${this.getUri()}`, value);
  }


  update<req, resp>(value: req, id: string | number): Observable<resp> {
    return this.http.put<resp>(`${this.apiUrl}/${this.getUri()}/${id}`, value);
  }

  delete<T>(id: string | number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.getUri()}/${id}`);
  }

  findAll<T>(map?: { [param: string]: string | string[] }): Observable<Array<T> | PageApi<T>> {
    const params = new HttpParams({ fromObject: map });
    return this.http.get<Array<T> | PageApi<T>>(`${this.apiUrl}/${this.getUri()}`, { params });
  }

  findById<T>(id: string | number, map?: { [param: string]: string | string[] }): Observable<T> {
    const params = new HttpParams({ fromObject: map });
    return this.http.get<T>(`${this.apiUrl}/${this.getUri()}/${id}`, { params });
  }

}

export interface PageApi<T> {
  content: Array<T>;
  pageable?: {
    sort: { sorted?: boolean, unsorted?: boolean, empty?: boolean }
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages?: number;
  totalElements?: number;
  last?: false
  number?: number;
  size?: number;
  sort?: { sorted?: boolean, unsorted?: boolean, empty?: boolean }
  numberOfElements?: number;
  first?: boolean;
  empty?: boolean
}
