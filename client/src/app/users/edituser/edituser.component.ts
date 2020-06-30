import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employees.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  userId;
  user;
  errorMsg: any;

  constructor(private actRoute: ActivatedRoute, public UsersServ: UsersService, private fb: FormBuilder, private router: Router) { }

  public edituserForm = this.fb.group({
    id: [this.userId],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['12345'],
    role: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.userId = id;
      console.log(this.userId);
      this.user = this.UsersServ.getUsersById(this.userId).subscribe(
        (data) => {this.user = data; console.log(data);
          this.edituserForm = this.fb.group({
            id: [this.userId],
            firstname: [this.user.firstname, [Validators.required, Validators.minLength(3)]],
            lastname: [this.user.lastname, [Validators.required, Validators.minLength(3)]],
            email: [this.user.email, [Validators.required, Validators.email]],
            password: ["12345"],
            role: [this.user.role, [Validators.required]]
          });
        },
        (error) => {this.errorMsg = error; console.log(error); }
      );
    });
  }

  get id() {
    return this.edituserForm.get('id');
  }

  get firstname() {
    return this.edituserForm.get('firstname');
  }

  get lastname() {
    return this.edituserForm.get('lastname');
  }

  get email() {
    return this.edituserForm.get('email');
  }

  get password() {
    return this.edituserForm.get('password');
  }

  get role() {
    return this.edituserForm.get('role');
  }

  update(userId, edituserForm){
    console.log(edituserForm);
    this.UsersServ.updateUser(this.userId, this.edituserForm.value).subscribe(
      (data) => {
        console.log(data);
        this.UsersServ.getUsers().subscribe(
          (data) => {this.UsersServ.users = data; console.log(data)},
          (error) => this.errorMsg = error
        )
      },
      (error) => {this.errorMsg = error; console.log(error); }
    );
    this.router.navigate(['/dashboard/userlist']);
  }

  cancelForm(){
    this.router.navigate(['/dashboard/userlist']);
  }

}
