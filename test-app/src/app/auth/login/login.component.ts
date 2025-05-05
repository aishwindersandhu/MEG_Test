import { Component } from '@angular/core';
//include directives and common pipes for data binding
import { CommonModule } from '@angular/common';
//treat forms as a sigle unit, easier to work with when it becomes bigger
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//to make HTTP api calls 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  title = 'login page';
  errorMessage = '';
  // isDisabled = true;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    //initialising formgroup as an instance of FormBuilder 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],    //creating validation boundary for login
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    //make valid login api call to login the user
    if (this.loginForm.invalid) return; // incase the form is empty or invalid

    this.http.post<{ token: string }>(
      'https://staging-master.azure.megsupporttools.com/api/v2/login/'
      , this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res, "response from login");
          this.errorMessage = '';
          //checking if the user is authenticated, since it's responding with a token.
          if (res.token) {
            //redirect to submitting data
            //setting the token in local storage for any further api calls
            //This can also be done using session storage if that's required
            localStorage.setItem('token', res.token);
          }
          //need to add else for test case
        },
        error: (err) => {
          console.log(err, "Please look at this error");
          this.errorMessage = "Incorrect Password or Username"
        }
      })
  }



}
