import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  public userForm;
  users;
  errorMsg;

  constructor(private fb: FormBuilder, public UsersServ: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.UsersServ.getUsers().subscribe(
      (data) => {this.users = data
              this.userForm = this.fb.group({
                  id: [this.UsersServ.generateId(this.users), [Validators.required]],
                  firstname: ['', [Validators.required, Validators.minLength(3)]],
                  lastname: ['', [Validators.required, Validators.minLength(3)]],
                  password: ['1234', [Validators.required, Validators.minLength(4)]],
                  email: ['', [Validators.required, Validators.email]],
                  role: ['', [Validators.required]]
      });},
      (error) => this.errorMsg = error
    )
  }

  onSubmit(employeeForm){
    console.log(this.userForm.value);
    this.UsersServ.postUsers(this.userForm.value).subscribe(
      (data) => {
        let user:User = {
          id: data['id'],
          firstname: data['firstname'],
          lastname: data['lastname'],
          email: data['email'],
          password: data['password'],
          role: data['role']
        }
        this.UsersServ.users.push(user); 
        // console.log(this.users);
        // this.UsersServ.getUsers().subscribe(
        //   (data) => {this.users = data; console.log(this.users)},
        //   (error) => this.errorMsg = error
        // )
      },
      (error) => this.errorMsg = error
    )
    this.router.navigate(['/userlist']);
    this.userForm.reset();
  }

  get id() {
    return this.userForm.get('id');
  }

  get firstname() {
    return this.userForm.get('firstname');
  }

  get lastname() {
    return this.userForm.get('lastname');
  }

  get email() {
    return this.userForm.get('email');
  }

  get role() {
    return this.userForm.get('role');
  }

  cancelForm(){
    this.router.navigate(['/employeelist']);
  }

}
