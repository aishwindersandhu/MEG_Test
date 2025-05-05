import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  //to route login component
  {path:'login',component:LoginComponent},
  //For default routing or on page load, redirect to login Page 
  {path:'**', component:LoginComponent},

];
