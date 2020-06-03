import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employees;
  private _url: string = "http://node-crud-demo-git-node-demo5.apps.us-east-1.starter.openshift-online.com/api/employees";
  private _url1: string = "http://node-crud-demo-git-node-demo5.apps.us-east-1.starter.openshift-online.com/api/employee";
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this._url)
    .pipe(catchError(this.errorHandler));
  }
  
  getEmployeesById(id: number): Observable<Employee[]>{
    //console.log((this._url1 + '/' + id))
    return this.http.get<Employee[]>(this._url1 + '/detail/' + id)
    .pipe(catchError(this.errorHandler));
  }

  postEmployee(empData): Observable<Employee[]>{
    return this.http.post<Employee[]>(this._url1 + '/new', empData)
    .pipe(catchError(this.errorHandler));
  }
  
  updateEmployee(id: number, empData): Observable<Employee[]>{
    console.log(empData)
    console.log(this._url + '/' + id)
    return this.http.post<Employee[]>(this._url1 + '/update/' + id, empData)
    .pipe(catchError(this.errorHandler));
  }

  deleteEmployee(id) {
    return this.http.get(this._url1 + '/delete/' + id);
  }
  
  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
