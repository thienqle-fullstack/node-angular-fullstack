import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userForm;
  errorMsg: any;
  users: import("d:/RemyaSummitworks/BootcampMaterials/WebUI/ERP App version2/node-crud-demo/client/src/app/models/user").User[];

  constructor(private fb: FormBuilder, private router: Router, public UsersServ: UsersService, public authServ: AuthService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['1', [Validators.required]]
    });
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

  get password() {
    return this.userForm.get('password');
  }

  get role() {
    return this.userForm.get('role');
  }

  onSubmit(userForm){
    console.log(this.userForm.value);
    this.authServ.register(this.userForm.value).subscribe(
      (data) => {
        this.authServ.users.push(data); 
        // this.UsersServ.postUsers(this.userForm.value).subscribe(
        //   (data) => {this.users = data; console.log(this.users)},
        //   (error) => this.errorMsg = error
        // )
      },
      (error) => {this.errorMsg = error; console.log(this.errorMsg)}
    )
    this.router.navigate(['/login']);
    this.userForm.reset();
  }

  login(){
    this.router.navigate(['/login']);
  }

}
