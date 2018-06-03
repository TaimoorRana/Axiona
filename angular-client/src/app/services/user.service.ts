import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable ,  of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../classes/user';

@Injectable()
export class UserService {

  private url = '/user';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Get all users
   * This is contains all the user's information
   * RESERVED FOR ADMIN USERS ONLY
   *
   * @returns {Observable<Object>}
   * @memberof UserService
   */
  getAll(): Observable<Object> {
    return this.http.get(`${this.url}/all`)
      .pipe(
        tap(users => this.log('fetched all users')),
        catchError(this.handleError<Object>('getAll()'))
      );
  }

  /**
   * Get all names of users
   * One should try to use this service instead of get/all 
   *
   * @returns {Observable<Object>}
   * @memberof UserService
   */
  getAllNames(): Observable<Object> {
    return this.http.get(`${this.url}/allnames`)
      .pipe(
        tap(users => this.log('fetched all names of users')),
        catchError(this.handleError<Object>('getAllNames()'))
      );
  }


  /**
   * Update a user by ID
   * 
   * @param {String} id 
   * @param {User} userData 
   * @returns {Observable<Object>} 
   * @memberof UserService
   */
  update(id: String, userData: User): Observable<Object> {
    return this.http.put(`${this.url}/${id}`, userData)
      .pipe(
        tap(users => this.log('user updated')),
        catchError(this.handleError<Object>('update(id: String, userData: User)'))
      );
  }

  /**
   * Delete a user by ID
   * 
   * @param {String} id 
   * @returns {Observable<Object>} 
   * @memberof UserService
   */
  delete(id: String): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        tap(users => this.log('user deleted')),
        catchError(this.handleError<Object>('delete(id: String)'))
      );
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
   * @memberof UserService
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed - ${error.message}`);
      return of(error as T);
    };
  }


  /**
   * Log messages by sending them to message service
   *
   * @private
   * @param {String} message
   * @memberof UserService
   */
  private log(message: String) {
    this.messageService.add('User Service: ' + message);
  }

}
