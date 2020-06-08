import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employees.service';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeeslist.component.html',
  styleUrls: ['./employeeslist.component.css']
})
export class EmployeeslistComponent implements OnInit {
  
  public employees;
  public errorMsg;


  dtOptions = {
      order: [[ 1, 'desc' ]],
      lengthMenu: [5, 10, 15, 20, 25, 50 ],
      responsive: true
  }

  constructor(public empService: EmployeeService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(
      (data) => this.empService.employees = data,
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
            (data) => this.empService.employees = data,
            (error) => this.errorMsg = error
          )
        })
      }
    });
  }



}
