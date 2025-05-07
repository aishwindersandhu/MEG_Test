import { Component } from '@angular/core';
import { FormService } from '../services/form.service';
import {FormBuilder,ReactiveFormsModule,FormGroup, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = "User successfully logged in";
  auditForm : FormGroup;
  constructor(private formService: FormService, private fb:FormBuilder) { 
    this.auditForm = this.fb.group({
      ward: ['', Validators.required],//Validation for Ward as required
      text_input: ['',Validators.required]
    })
  }
 
  //fetching audit form data as soon as the user is authenticated
  //populating some fields based on the data received
  ngOnInit(): void {
    this.formService.getFormData()
      .subscribe({
        next: (data) => {
          console.log(data, "data");
        },
        error: (err) => {
          console.log(err, "err in GET AUDIT FORMS");
        }
      });
  }
  submitForm(){
    this.formService.submitFormData(this.auditForm.value)
      .subscribe({
        next:(data)=>{
          console.log("submitted successfully", data);
        },
        error:(err)=>{
          console.log(err,"error in submission");
        }
      })
  }

}
