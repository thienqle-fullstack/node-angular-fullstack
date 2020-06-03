import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeslistComponent } from './employeeslist/employeeslist.component';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addemployee', component: AddemployeeComponent },
  {path: 'employeelist', component: EmployeeslistComponent},
  { path: 'employeelist/:id', component: EmployeedetailsComponent },
  { path: 'editemployee/:id', component: EditemployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,
                                  RegisterComponent,
                                  HomeComponent,
                                  EmployeeslistComponent,
                                  EditemployeeComponent,
                                  EmployeedetailsComponent,
                                  EmployeedetailsComponent,
                                  AddemployeeComponent
]
