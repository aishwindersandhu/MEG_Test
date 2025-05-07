import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface AuditFormResponse {

}
@Injectable({
  providedIn: 'root'
})
export class FormService {
  id = 96;//Ideally need to pass the id acquired from user profile from logging-in
  private getFormDataUrl = `/api/v2/audit_form/${this.id}/`;
  private postFormDataUrl = `/api/v2/audit_form/${this.id}/submit/`;
  //getting authenticated token from localstorage, this can be done via session as well. 
  token = localStorage.getItem('token');
  postObj = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${this.token}`, //sending the obtained token for further api calls.

    },
    body: { "send_email": true, "observations": [{ "ward": 1, "date": "2023-03-01", "custom_str_fi eld": "fi eld value", "custom_bool_fi eld": true, "custom_int_fi eld": 100, "custom_fl oat_fi eld": 99.99, }], "start_time": "2023-03-01T09:20:51.510Z", "end_time": "2023-03-01T09:20:51.510Z", "comment": "this is a comment explaining this observation", },
    withCredentials: true
  }
  constructor(private http: HttpClient) { }
  getFormData(): Observable<any> {
    return this.http.get<any>(this.getFormDataUrl, this.postObj).pipe((
      tap((res) => {
        console.log(res, "response from get form data");
      }
      )),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  submitFormData(): Observable<any> {
    return this.http.post<any>(this.postFormDataUrl, this.postObj).pipe((
      tap((res) => {
        console.log(res, "response from get form data");
      }
      )),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
