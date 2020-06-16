import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component';

import { HomeComponent } from './home/home.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

import { AddemployeeComponent } from './employees/addemployee/addemployee.component';
import { EmployeeslistComponent } from './employees/employeeslist/employeeslist.component';
import { EmployeedetailsComponent } from './employees/employeedetails/employeedetails.component';
import { EditemployeeComponent } from './employees/editemployee/editemployee.component';
import { UserslistComponent } from './users/userslist/userslist.component';
import { AdduserComponent } from './users/adduser/adduser.component';
import { EdituserComponent } from './users/edituser/edituser.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EventslistComponent } from './events/eventslist/eventslist.component';
import { AddeventComponent } from './events/addevent/addevent.component';
import { EditeventComponent } from './events/editevent/editevent.component';
import { EventdetailsComponent } from './events/eventdetails/eventdetails.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'addemployee', component: AddemployeeComponent },
  {path: 'employeelist', component: EmployeeslistComponent},
  { path: 'employeelist/:id', component: EmployeedetailsComponent },
  { path: 'editemployee/:id', component: EditemployeeComponent },
  { path: 'userlist', component: UserslistComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'edituser/:id', component: EdituserComponent },
  { path: 'eventslist', component: EventslistComponent },
  { path: 'addevent', component: AddeventComponent },
  { path: 'editevent/:id', component: EditeventComponent },
  { path: 'eventslist/:id', component: EventdetailsComponent },
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
                                  AddemployeeComponent,
                                  UserslistComponent,
                                  AdduserComponent,
                                  EdituserComponent,
                                  EventslistComponent,
                                  AddeventComponent,
                                  EditeventComponent,
                                  EventdetailsComponent
]
