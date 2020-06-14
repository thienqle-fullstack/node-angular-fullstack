import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUser } from 'src/app/models/LoginUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public employeeForm;

  constructor(private fb: FormBuilder, private router: Router,private authSerice: AuthService) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  get email() {
    return this.employeeForm.get('email');
  }
  get password() {
    return this.employeeForm.get('password');
  }

  onSubmit(employeeForm){
    console.log(this.employeeForm.value);
    let loginUser: LoginUser = new LoginUser();
    this.authSerice.login(this.employeeForm.value).subscribe(
      (data) => {
        loginUser.email = this.employeeForm.value.email
        loginUser.password = this.employeeForm.value.password
        loginUser.accesstoken = data['accessToken']
        localStorage.setItem('currentuser',JSON.stringify(loginUser))
        this.authSerice.currentuser = JSON.parse(localStorage.getItem('currentuser'))
        this.employeeForm.reset();
      },
      (error) => {console.log(error)}
    )
    this.router.navigate(['/employeelist']);
  }

  register(){
    this.router.navigate(['/register']);
  }
}
