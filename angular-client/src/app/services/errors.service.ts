import { Injectable, Injector } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ErrorsService {

  private url = '/api/loggederror';

  constructor(
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
    return this.http.post<Object>(`${this.url}`, errorLogged)
    .pipe(
      map(_ => errorLogged)
    );
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

}
