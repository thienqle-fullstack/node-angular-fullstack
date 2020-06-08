import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {

  employeeId;
  employee;
  errorMsg;

  constructor(private actRoute: ActivatedRoute, private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.employeeId = id;
      console.log(this.employeeId);
      this.empService.getEmployeesById(this.employeeId).subscribe(
        (data) => {
          this.employee = data; 
          console.log(data); 
        },
        (error) => {this.errorMsg = error; console.log(error); }
      );
    });
  }
  
  goBack(){
    this.router.navigate(['/employeelist']);
  }

}
