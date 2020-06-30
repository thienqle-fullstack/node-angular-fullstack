import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { Location } from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'employee-management-app';  
  isLoggedIn$: Observable<boolean>;
  currentPath: any;
  checkclick;

  constructor(public authService : AuthService,private router: Router,public location: Location, public platformLocation: PlatformLocation) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.currentPath = this.location.path();
  }
  

  ngAfterViewInit(){
    this.currentPath = this.location.path();
    this.platformLocation.onPopState(() => {

      console.log('pressed back!');
    });
  }

  logout(){
      console.log("Logout call!")
      this.authService.logout();
      localStorage.removeItem('currentUser');
      localStorage.clear(); //removeItem cant seem to work
      this.authService.currentuser = null;
      this.isLoggedIn$ = this.authService.isLoggedIn;
      this.router.navigate(['/login']);
  }

  // checkClicked($variablefromchild){
  //   this.checkclick = $variablefromchild
  //   if(this.checkclick){
  //     this.currentPath = '/login'
  //   } else {
  //     this.currentPath = '/home'
  //     this.router.navigate(['/home']);
  //   }
  // }

}
