import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'employee-management-app';  
  isLoggedIn$: Observable<boolean>;


  constructor(public authService : AuthService, private router:Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  

  logout(){
      console.log("Logout call!")
      this.authService.logout();
      localStorage.removeItem('currentUser');
      localStorage.clear(); //removeItem cant seem to work
      this.authService.currentuser = null;
      this.isLoggedIn$ = this.authService.isLoggedIn;
      console.log('here ')
      console.log(this.isLoggedIn$)
      this.router.navigate(['/login']);
  }


}
