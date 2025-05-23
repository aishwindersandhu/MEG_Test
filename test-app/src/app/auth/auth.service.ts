import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

//expecting this kind of response
interface LoginResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://staging-master.azure.megsupporttools.com/api/v2/login/';
  constructor(private http: HttpClient) { }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      this.loginUrl
      , credentials).pipe((
        tap((res) => {
         
          if (res.token) {
            console.log("Login Successful");
            //setting the token in local storage for any further api calls
            //This can also be done using session storage
            localStorage.setItem('token', res.token);
          }
          //need to add else for test case
        }
        )),
        catchError((err) => {
          return throwError(() => err);
        })
      );

  }
}
