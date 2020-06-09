import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public employeeForm;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
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
    this.employeeForm.reset();
    this.router.navigate(['/employeelist']);
  }

  register(){
    this.router.navigate(['/register']);
  }
}
