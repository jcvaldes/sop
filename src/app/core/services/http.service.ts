import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(protected http: HttpClient) {}
  public get<T>(url): Observable<any> {
    return this.http.get(url);
  }
  public post(url, payload): Observable<any> {
    return this.http.post(url, payload);
  }
  public put<T>(url, payload: T): Observable<T> {
    return this.http.put<T>(url, payload);
  }
  public delete(url): Observable<any> {
    return this.http.delete(url);
  }
}
