import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employees.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeeslist.component.html',
  styleUrls: ['./employeeslist.component.css']
})
export class EmployeeslistComponent implements OnInit {
  
  public employees;
  public errorMsg;

  constructor(private empService: EmployeeService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(
      (data) => this.employees = data,
      (error) => this.errorMsg = error
    )
  }
  
  selectemployee(employee){
    console.log(employee)
    this.router.navigate(['/employeelist', employee.id]);
  }

  editEmployee(employee){
    console.log(employee)
    this.router.navigate(['/editemployee', employee.id]);
  }


  deleteEmployee(employee){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.empService.deleteEmployee(employee.id).subscribe(() => {
          this.empService.getEmployees().subscribe(
            (data) => this.employees = data,
            (error) => this.errorMsg = error
          )
        })
      }
    });
  }
}
