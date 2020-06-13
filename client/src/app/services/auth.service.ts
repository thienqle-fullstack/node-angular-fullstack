import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public users = [];
  private _url: string = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  register(userData): Observable<User[]>{
    return this.http.post<User[]>(this._url + '/register', userData)
    // .pipe(catchError(this.errorHandler));
  }

  login(loginData):Observable {
    return this.http.post(this._url + '/login', loginData)
  }


  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
  
}
