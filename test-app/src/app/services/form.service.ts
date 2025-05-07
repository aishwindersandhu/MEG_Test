import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface AuditFormResponse{
  
}
@Injectable({
  providedIn: 'root'
})
export class FormService {
   private getFormDataUrl = 'https://staging-master.azure.megsupporttools.com/api/v2/audit_form/';
    constructor(private http: HttpClient) { }
    getFormData(): Observable<any> {
      const csrfToken = 'csrftoken=qqchOwPb1NVM0raKhJUzHspa3tuD1ohS'
      return this.http.get<any>(this.getFormDataUrl,{
        headers:{
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          //'Authorization': `Bearer ${}`
        },
        withCredentials:true
        
      }).pipe((
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
