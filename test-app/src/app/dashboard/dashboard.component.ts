import { Component } from '@angular/core';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = "User successfully logged in";
  constructor(private formService: FormService) { }
  ngOnInit(): void {
    this.formService.getFormData()
      .subscribe({
        next: (data) => {
          console.log(data, "data");
        },
        error: (err) => {
          console.log(err, "err in getForms");
        }
      });
     
      
  }
  submitForm(){
    
    this.formService.submitFormData()
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
