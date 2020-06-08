import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {

  public employeeForm;
  employees;
  errorMsg;

  constructor(private fb: FormBuilder, private empService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.empService.getEmployees().subscribe(
      (data) => {this.employees = data
              this.employeeForm = this.fb.group({
                  id: [this.empService.generateId(this.employees), [Validators.required]],
                  name: ['', [Validators.required, Validators.minLength(3)]],
                  age: ['', [Validators.required, Validators.pattern('^(?:1[01][0-9]|120|1[7-9]|[2-9][0-9])$')]],
                  salary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      });}
      ,
      (error) => this.errorMsg = error
    )
     
  }

  onSubmit(employeeForm){
    console.log(this.employeeForm.value);
    this.empService.postEmployee(this.employeeForm.value).subscribe(
      (data) => {
        this.empService.employees.push(data); 
        // console.log(this.employees);
        // this.empService.getEmployees().subscribe(
        //   (data) => {this.employees = data; console.log(this.employees)},
        //   (error) => this.errorMsg = error
        // )
      },
      (error) => this.errorMsg = error
    )
    this.router.navigate(['/employeelist']);
    this.employeeForm.reset();
  }

  get id() {
    return this.employeeForm.get('id');
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get age() {
    return this.employeeForm.get('age');
  }

  get salary() {
    return this.employeeForm.get('salary');
  }

  cancelForm(){
    this.router.navigate(['/employeelist']);
  }

}
