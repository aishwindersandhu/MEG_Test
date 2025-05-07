import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface AuditFormResponse {

}
@Injectable({
  providedIn: 'root'
})
export class FormService {
  id = 96;//Ideally need to pass the id acquired from user profile from logging-in
  // private getFormDataUrl = `/api/v2/audit_form/${this.id}/`;
  private getFormDataUrl = `/api/v2/audit_form/`;
  private postFormDataUrl = `/api/v2/audit_form/${this.id}/submit/`;
  //getting authenticated token from localstorage, this can be done via session as well. 
  token = localStorage.getItem('token');
  getObj = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Token ${this.token}`, //sending the obtained token for further api calls.
    }
  }
  postObj = {
      "start_time": "2025-05-07T17:49:00.000Z",
      "end_time": "2025-05-07T17:49:00.000Z",
      "comment": null,
      "send_email": false,
      "observations": [
        {
          "ward": 32,
          "date": "2025-05-07T17:49:40.262Z",
          "issues": [],
          "answer_comments": [],
          "valid": true,
          "text_input": "abcd",
          "choice_field": "N/A"
        }
      ],
      "signatures": [],
      "report_auditors": [],
      "submitting_anonymously": false
  }

  constructor(private http: HttpClient) { }

  getFormData(): Observable<any> {
    return this.http.get<any>(this.getFormDataUrl, this.getObj).pipe((
      tap((res) => {
        console.log(res, "response from get form data");
      }
      )),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
  post_headers = {
    headers: new HttpHeaders().set('Authorization',`Token ${this.token}`)
  }
  submitFormData():Observable<any>{
    return this.http.post<any>(this.postFormDataUrl,this.postObj,this.post_headers).pipe(
      tap((res)=>{
        console.log("res",res);
      }),
      catchError((err)=>{
        console.log("res",err);
        return throwError(() => err);
      })
    )
  }


}
