import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { LoginUser } from '../models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentuser : LoginUser = null;
  public users = [];
  private _url: string = "http://localhost:4000";
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    this.currentuser = JSON.parse(localStorage.getItem('currentuser'))
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isLoggedin1() {
    if(this.currentuser!==null){
      return true;
    } else {
      return false;
    }
  }

  register(userData): Observable<User[]>{
    return this.http.post<User[]>(this._url + '/register', userData)
    // .pipe(catchError(this.errorHandler));
  }

  login(loginData):Observable<LoginUser> {
    
    return this.http.post<LoginUser>(this._url + '/login', loginData)
  }

  getRole(email){
    return this.http.get(this._url + '/users?email=' + email)
  }

  logout() {
    this.loggedIn.next(false);
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
  
}
