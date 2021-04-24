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

  protected abstract getUri(params?: string): string;

  save<req, resp>(value: req, urlPathParams?: string): Observable<resp> {
    if ((value as any).id) {
      return this.update(value, (value as any).id, urlPathParams);
    } else {
      return this.create(value, urlPathParams);
    }
  }

  create<req, resp>(value: req, urlPathParams?: string): Observable<resp> {
    return this.http.post<resp>(`${this.apiUrl}/${this.getUri(urlPathParams)}`, value);
  }


  update<req, resp>(value: req, id: string | number, urlPathParams?: string): Observable<resp> {
    return this.http.put<resp>(`${this.apiUrl}/${this.getUri(urlPathParams)}/${id}`, value);
  }

  delete<T>(id: string | number, urlPathParams?: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${this.getUri(urlPathParams)}/${id}`);
  }

  findAll<T>(map?: { [param: string]: string | string[] }, urlPathParams?: string): Observable<Array<T> | PageApi<T>> {
    const params = new HttpParams({ fromObject: map });
    return this.http.get<Array<T> | PageApi<T>>(`${this.apiUrl}/${this.getUri(urlPathParams)}`, { params });
  }

  findById<T>(id: string | number, map?: { [param: string]: string | string[] }, urlPathParams?: string): Observable<T> {
    const params = new HttpParams({ fromObject: map });
    return this.http.get<T>(`${this.apiUrl}/${this.getUri(urlPathParams)}/${id}`, { params });
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
