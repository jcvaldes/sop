import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // tslint:disable-next-line: variable-name
  private _url: string;
  public get url(): string {
    return this._url;
  }
  public set url(value: string) {
    this._url = value;
  }
  constructor(protected http: HttpClient) { }
  get<T>(url): Observable<any> {
    return this.http.get(url);
  }
  getSingle<T>(url, id: any) {
    return this.http.get<T>(
      `${url}/${id}`
    );
  }
  post(url, payload): Observable<any> {
    return this.http.post(url, payload);
  }
  put<T>(url, payload: T): Observable<T> {
    return this.http.put<T>(url, payload);
  }
  delete(url): Observable<any> {
    return this.http.delete(url);
  }
}
