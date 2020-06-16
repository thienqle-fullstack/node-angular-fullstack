import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public events : Event[] = [];
  private _url: string = "http://localhost:4000/events";
  
  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]>{
    return this.http.get<Event[]>(this._url)
    .pipe(catchError(this.errorHandler));
  }

  getEventById(id: number): Observable<Event[]>{
    return this.http.get<Event[]>(this._url + '/' + id)
    .pipe(catchError(this.errorHandler));
  }

  postEvent(userData): Observable<Event>{
    return this.http.post<Event>(this._url + '/', userData)
    .pipe(catchError(this.errorHandler));
  }
  
  updateEvent(id: number, userData): Observable<Event[]>{
    return this.http.put<Event[]>(this._url + '/' + id, userData)
    .pipe(catchError(this.errorHandler));
  }

  deleteEvent(id) {
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
