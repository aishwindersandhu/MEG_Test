import { Component } from '@angular/core'; 
//include directives and common pipes for data binding
import {CommonModule} from '@angular/common'; 
//treat forms as a sigle unit, easier to work with when it becomes bigger
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'; 

@Component({
  selector: 'login',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    title = 'login page'
    loginForm: FormGroup;
    constructor(private fb: FormBuilder) {
      //initialising formgroup as an instance of FormBuilder
      this.loginForm = this.fb.group({
        username : ['',Validators.required],    //creating validation boundary for login
        password : ['',Validators.required]
      });
    }
    onSubmit(){
      //make valid login api call to login the user
      console.log('inside submit function');
    }

    
   
}
