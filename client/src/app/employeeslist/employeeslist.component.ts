import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employees.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeeslist.component.html',
  styleUrls: ['./employeeslist.component.css']
})
export class EmployeeslistComponent implements OnInit {
  
  public employees;
  public errorMsg;
  //displayedColumns: string[] = ['ID', 'name', 'age', 'salary'];

  
  // public employees: Employee[] = [
  //   {ID: 1, name: 'Hydrogen', age: 25, salary: 10000},
  //   {ID: 2, name: 'Helium', age: 35, salary: 20000}
  // ];

  // dataSource = this.employees;

  constructor(private empService: EmployeeService, private router: Router) { }


  ngOnInit(): void {
    this.empService.getEmployees().subscribe(
      (data) => this.employees = data,
      (error) => this.errorMsg = error
    )
  }

  selectemployee(employee){
    console.log(employee)
    this.router.navigate(['/employeelist/', employee._id]);
  }

  editEmployee(employee){
    this.router.navigate(['/editemployee', employee._id]);
  }

  deleteEmployee(employee){
    this.empService.deleteEmployee(employee._id).subscribe(() => {
      this.empService.getEmployees().subscribe(
        (data) => this.employees = data,
        (error) => this.errorMsg = error
      )
    })
  }


}
