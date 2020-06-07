import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  public users = [
    {"id": 1, 'firstName' :	'Admin', 'lastName': 'Admin', 'email' :	'admin@email.com', 'role' : 0},
    {"id": 2, 'firstName' :	'First', 'lastName': 'User', 'email' :	'user1@email.com', 'role' : 1},
    {"id": 3, 'firstName' :	'Second', 'lastName': 'User', 'email' :	'user2@email.com', 'role' : 1},
  ];
  private _url: string = "http://localhost:4000/user";
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this._url)
    .pipe(catchError(this.errorHandler));
    //Return an array data as observable
    //return of(this.users)
  }
  
  getUsersById(id: number): Observable<User[]>{
    return this.http.get<User[]>(this._url + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  postUsers(userData): Observable<User[]>{
    return this.http.post<User[]>(this._url + '/new', userData)
    .pipe(catchError(this.errorHandler));
  }
  
  updateUser(id: number, userData): Observable<User[]>{
    return this.http.put<User[]>(this._url + '/' + id, userData)
    .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id) {
    return this.http.delete(this._url + '/' + id);
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }

  generateId(userData){
    let max=0;
    userData.forEach((userData) => {
      if(max < userData.id) {
        max = parseInt(userData.id);
      }
    })
    return max+1
  }

}
