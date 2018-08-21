import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';
import { SessionError } from '../session-error';
import { User } from '../users/user';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost/api/v1/';

  constructor(private http: HttpClient) { }

  public getSession(): Observable<User | SessionError> {
    return this.http.get<any>(this.baseUrl + 'session')
    .pipe(
      map(b => <User> {
        uid: b.uid,
        username:  b.username,
        name: b.name,
        roles: b.roles
      }),
      catchError(err => this.handleHttpError(err))
    );
  }

  /**
   * register
   */
  public register(registerForm: any) {
    const register = {
      customer: {
          username: registerForm.username,
          name: registerForm.name,
          password: registerForm.password
        }
    };

    return this.http.post<any>(this.baseUrl + 'signUp',  register)
    .pipe(
      map(rep => <User | any> {
        uid: rep.uid,
        username: rep.username,
        name: rep.name
      })
    );
  }

  /**
   * login
   */
  public login(loginForm: any): Observable<User> {

    console.log(' loginForm: ', loginForm);
    const data = {
      customer: {
          username: loginForm.userName,
          password: loginForm.password
        }
    };

    console.log(' login data: ', data);

    return this.http.post<any>(this.baseUrl + 'login', data)
    .pipe(
      map(rep => <User> {
        uid: rep.uid,
        username: rep.username,
        name: rep.name,
        roles: rep.roles
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse): Observable<SessionError> {
    const dataError = new SessionError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred when reading the session';
    return of(dataError);
  }

}
