import { Injectable, Injector } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ErrorsService {

  private url = '/api/loggederror';

  constructor(
    private authService: AuthenticationService,
    private injector: Injector,
    private http: HttpClient
  ) { }

  /**
   * Log error
   *
   * @param {any} error
   * @memberof ErrorsService
   */
  log(error): Observable<Object> {
    const errorLogged = this.addErrorInfo(error);
    return this.http.post<Object>(`${this.url}`, errorLogged);
  }

  /**
   * Add information to the error being logged
   *
   * @private
   * @param {any} error
   * @returns {Object}
   * @memberof ErrorsService
   */
  private addErrorInfo(error): Object {

    const name = error.name || null;
    const username = 'axiona'; // TODO: this.authService.profile.name;
    const time = new Date().getTime();
    const refID = `${username}-${time}`;
    const location = this.injector.get(LocationStrategy);
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const status = error.status || null;
    const message = error.message || error.toString();
    const errorInfo = { name, refID, url, status, message };
    return errorInfo;

  }

  /**
   * Capture errors from the error service
   * and let the app keep running with a returned Observable
   *
   * @private
   * @template T
   * @param {string} [operation='operation']
   * @param {T} [result]
   * @returns
   * @memberof ErrorsService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
