import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-app';

  constructor(public authService : AuthService,private router:Router) {}

  logout(){
      console.log("Logout call!")
      localStorage.removeItem('currentUser');
      localStorage.clear(); //removeItem cant seem to work
      this.authService.currentuser = null;
      this.router.navigate(['/login']);
  }

}
