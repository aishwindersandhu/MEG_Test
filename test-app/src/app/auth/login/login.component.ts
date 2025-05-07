import { Component } from '@angular/core';
//include directives and common pipes for data binding
import { CommonModule } from '@angular/common';
//treat forms as a sigle unit, easier to work with when it becomes bigger
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//to make HTTP api calls 
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    //initialising formgroup as an instance of FormBuilder 
    this.loginForm = this.fb.group({
      username: ['', Validators.required],//creating validation boundary for login
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    //make valid login api call to login the user
    if (this.loginForm.invalid) return; // incase the form is empty or invalid
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (res) => {
          //Redirect to dashboard only if valid token
          if (res.token) {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (err) => {
          this.errorMessage = "Invalid Credentials"
          console.log(err, "Error from API");
        }
      });
  }
}
