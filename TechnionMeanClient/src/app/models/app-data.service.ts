/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './entities/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  constructor(private server: HttpClient) {}

  //serverUrl = 'users'; //production heroku
  //serverUrl = 'http://localhost:3000/users'; Change for local Host
  serverUrl = environment.apiUrl;

  getAllUsers(): Observable<any> {
    console.log('url: ' + this.serverUrl);

    return this.server
      .get<User[]>(this.serverUrl)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    const url = this.serverUrl + '/' + user._id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.server
      .put<User>(url, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUserbyID(id: string): Observable<User> {
    return this.server.get<User>(this.serverUrl + '/' + id);
  }

  deleteUser(user: User): Observable<any> {
    const url = this.serverUrl + '/' + user._id;
    console.log('delete url: ' + url);
    return this.server.delete(url).pipe(catchError(this.handleError));
  }

  postUser(user: User): Observable<User> {
    console.log('user to post: ' + JSON.stringify(user));
    console.log('url: ' + this.serverUrl);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.server
      .post<User>(this.serverUrl, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
