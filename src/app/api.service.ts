import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { environment } from '../environments/environment'

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private messageService: MessageService,
    private http: HttpClient
  ) { }

  log(message: string): void {
    this.messageService.add(message);
  }

  post<T>(link: string,
    data: T,
    operation: string,
    ptap: any = _ => {
      this.log('Saved')
    }
  ): Observable<any> {
    const headers = (new HttpHeaders()).set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(environment.apiEndPoint + link, data, { headers, responseType: 'text' })
      .pipe(tap(ptap))
      .pipe(catchError(err => { return this.handleError<T>(err, operation, null) }))
  }

  patch<T>(link: string,
    data: T,
    operation: string,
    ptap: any = _ => {
      this.log('Saved')
    }
  ): Observable<any> {
    return this.http.patch(environment.apiEndPoint + link, data)
      .pipe(tap(ptap))
      .pipe(catchError(err => { return this.handleError<T>(err, operation, '') }))
  }

  get_paginated<T>(link: string,
    operation: string,
    fail_return: T | string,
    httpParams: HttpParams = null,
    ptap: any = _ => {
      this.log('fetched')
    }
  ): Observable<[T,number]> {
    return this.http.get<T>(environment.apiEndPoint + link, { params: httpParams })
      .pipe(tap(ptap))
      .pipe(map(
        data => {
          return [data['results'],data['count']];
        }
      ));
  }

  get<T>(link: string,
    operation: string,
    fail_return: T | string,
    httpParams: HttpParams = null,
    ptap: any = _ => {
      this.log('fetched')
    }
  ): Observable<T> {
    return this.http.get<T>(environment.apiEndPoint + link, { params: httpParams })
      .pipe(tap(ptap)
        //catchError(err => { return this.handleError<T>(err, operation, fail_return) }),
      );
  }

  handleDefaultTap(): void {
    this.log('fetched');
  }

  handleError<T>(err, operation = 'operation', fail_return?: T | string | null) {
    if (fail_return == null)
      return throwError(err);
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(fail_return as T);
    };
  }

  /*handleError<T>(err, operation='operation', fail_return?: T | string ) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(fail_return as T);
    };
  }*/
}
