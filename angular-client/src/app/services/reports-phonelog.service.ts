import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable()
export class ReportPhonelogService {

  private url = '/api/reports/phonelog';

  constructor(private http: HttpClient,
    private messageService: MessageService) {

  }

  /**
   * Log messages by sending them to message service
   *
   * @private
   * @param {String} message
   * @memberof PhonelogService
   */
  private log(message: String) {
    this.messageService.add('Phonelog Service: ' + message);
  }

    /**
   * Capture errors from the service, then log them,
   * and let the app keep running with a returned Observable
   *
   * @private
   * @template T
   * @param {string} [operation='operation']
   * @param {T} [result]
   * @returns
   * @memberof PhonelogService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(result as T);
    };
  }

reportUrgency(): Observable<Object[]> {
  return this.http.get<Object[]>(`${this.url}/urgency`)
  .pipe(
    catchError(this.handleError<Object[]>('reportUrgency()'))
  );
}

/** Reports-related calls */

reportUrgentYes(): Observable<Object> {
  return this.http.get(`${this.url}/urgentyes`)
    .pipe(
      tap(participants => this.log('fetched number of all urgent calls')),
      catchError(this.handleError<Object>('reportUrgentYes()'))
    );
}

reportUrgentNo(): Observable<Object> {
  return this.http.get(`${this.url}/urgentno`)
    .pipe(
      tap(participants => this.log('fetched number of all non-urgent calls')),
      catchError(this.handleError<Object>('reportUrgentNo()'))
    );
}

reportCallerTypeTrans(): Observable<Object> {
  return this.http.get(`${this.url}/callertrans`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by trans persons')),
      catchError(this.handleError<Object>('reportCallerTypeTrans()'))
    );
}

reportCallerTypeOrganization(): Observable<Object> {
  return this.http.get(`${this.url}/callerorganization`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by organizations')),
      catchError(this.handleError<Object>('reportCallerTypeOrganization()'))
    );
}

reportCallerTypeSocialWorker(): Observable<Object> {
  return this.http.get(`${this.url}/callersocialworker`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by social workers')),
      catchError(this.handleError<Object>('reportCallerTypeSocialWorker()'))
    );
}

reportCallerTypeOther(): Observable<Object> {
  return this.http.get(`${this.url}/callerother`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by other persons')),
      catchError(this.handleError<Object>('reportCallerTypeOther()'))
    );
}

reportCallerPronounUND(): Observable<Object> {
  return this.http.get(`${this.url}/callerpronounundisclosed`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by pronoun undisclosed')),
      catchError(this.handleError<Object>('callerPronounUND()'))
    );
}

reportCallerPronounSHE(): Observable<Object> {
  return this.http.get(`${this.url}/callerpronounshe`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by pronoun she')),
      catchError(this.handleError<Object>('callerPronounSHE()'))
    );
}

reportCallerPronounTHEY(): Observable<Object> {
  return this.http.get(`${this.url}/callerpronounthey`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by pronoun they')),
      catchError(this.handleError<Object>('callerPronounTHEY()'))
    );
}

reportCallerPronounHIM(): Observable<Object> {
  return this.http.get(`${this.url}/callerpronounhim`)
    .pipe(
      tap(participants => this.log('fetched number of calls made by pronoun him')),
      catchError(this.handleError<Object>('reportCallerPronounHIM()'))
    );
}


}
