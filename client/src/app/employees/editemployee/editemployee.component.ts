import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  employeeId;
  employee;
  errorMsg;
  employees;
  //editemployeeForm;

  constructor(private actRoute: ActivatedRoute, private empService: EmployeeService, private fb: FormBuilder, private router: Router) { }

  public editemployeeForm = this.fb.group({
    id: [this.employeeId],
    name: ['', [Validators.required, Validators.minLength(3)]],
    age: ['', [Validators.required, Validators.pattern('^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$')]],
    salary: [0, [Validators.required, Validators.pattern('^[0-9]+$')]]
  });

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.employeeId = id;
      console.log(this.employeeId);
      this.employee = this.empService.getEmployeesById(this.employeeId).subscribe(
        (data) => {this.employee = data; console.log(data);
          this.editemployeeForm = this.fb.group({
            id: [this.employeeId],
            name: [this.employee.name, [Validators.required, Validators.minLength(3)]],
            age: [this.employee.age, [Validators.required, Validators.pattern('^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$')]],
            salary: [this.employee.salary, [Validators.required, Validators.pattern('^[0-9]+$')]]
          });
        },
        (error) => {this.errorMsg = error; console.log(error); }
      );
    });
  }
  
  get name(){
    return this.editemployeeForm.get('name');
  }

  get age(){
    return this.editemployeeForm.get('age');
  }

  get salary(){
    return this.editemployeeForm.get('salary');
  }
  update(employeeId, editemployeeForm){
    this.empService.updateEmployee(this.employeeId, this.editemployeeForm.value).subscribe(
      (data) => {
        console.log(data);
        this.empService.getEmployees().subscribe(
          (data) => this.empService.employees = data,
          (error) => this.errorMsg = error
        )
      },
      (error) => {this.errorMsg = error; console.log(error); }
    );
    this.router.navigate(['/dashboard/employeelist']);
  }

  cancelForm(){
    this.router.navigate(['/dashboard/employeelist']);
  }

}
