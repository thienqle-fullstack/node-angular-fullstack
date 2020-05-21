import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public employeeForm;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  get name() {
    return this.employeeForm.get('name');
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
  }

  login(){
    this.router.navigate(['/login']);
  }

}
