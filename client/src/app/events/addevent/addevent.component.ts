import { Component, OnInit } from '@angular/core';
import { EventsService } from '../.././services/events.service'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  public eventForm;
  events;
  errorMsg;

  constructor(public eventsServ: EventsService, private fb: FormBuilder, private router: Router) { }

  minDate = new Date(new Date().setDate(new Date().getDate()));

  maxDate =  new Date(new Date().setDate(this.minDate.getDate()));

  ngOnInit(): void {
    this.eventsServ.getEvents().subscribe(
      (data) => {this.events = data
              this.eventForm = this.fb.group({
                  id: [this.eventsServ.generateId(this.events), [Validators.required]],
                  name: ['', [Validators.required, Validators.minLength(3)]],
                  category: ['', [Validators.required]],
                  location: ['', [Validators.required]],
                  startDate: ['', [Validators.required]],
                  endDate: ['', [Validators.required]]
      });}
      ,
      (error) => this.errorMsg = error
    )
  }

  onSubmit(eventForm){
    console.log(this.eventForm.value);
    this.eventsServ.postEvent(this.eventForm.value).subscribe(
      (data) => {
        this.eventsServ.events.push(data);
      },
      (error) => this.errorMsg = error
    )
    this.router.navigate(['/dashboard/eventslist']);
    this.eventForm.reset();
  }

  get id() {
    return this.eventForm.get('id');
  }

  get name() {
    return this.eventForm.get('name');
  }

  get category() {
    return this.eventForm.get('category');
  }

  get location() {
    return this.eventForm.get('location');
  }

  get startDate() {
    return this.eventForm.get('startDate');
  }

  get endDate() {
    return this.eventForm.get('endDate');
  }

  cancelForm(){
    this.router.navigate(['/dashboard/eventslist']);
  }

}
