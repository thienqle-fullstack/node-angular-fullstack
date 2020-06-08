import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  userId;
  user;
  errorMsg: any;

  constructor(private actRoute: ActivatedRoute, private empService: EmployeeService, private fb: FormBuilder, private router: Router) { }

  public edituserForm = this.fb.group({
    id: [this.userId],
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.userId = id;
      console.log(this.userId);
      this.user = this.empService.getEmployeesById(this.userId).subscribe(
        (data) => {this.user = data; console.log(data);
          this.edituserForm = this.fb.group({
            id: [this.userId],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            role: ['', [Validators.required]]
          });
        },
        (error) => {this.errorMsg = error; console.log(error); }
      );
    });
  }

  get id() {
    return this.edituserForm.get('id');
  }

  get firstName() {
    return this.edituserForm.get('firstName');
  }

  get lastName() {
    return this.edituserForm.get('lastName');
  }

  get email() {
    return this.edituserForm.get('email');
  }

  get role() {
    return this.edituserForm.get('role');
  }

  update(employeeId, editemployeeForm){
    //console.log(this.employeeId);
    //console.log(this.editemployeeForm);
    this.empService.updateEmployee(this.userId, this.edituserForm.value).subscribe(
      (data) => {
        console.log(data);
        this.empService.getEmployees().subscribe(
          (data) => this.empService.employees = data,
          (error) => this.errorMsg = error
        )
      },
      (error) => {this.errorMsg = error; console.log(error); }
    );
    this.router.navigate(['/userlist']);
  }

  cancelForm(){
    this.router.navigate(['/userlist']);
  }

}
