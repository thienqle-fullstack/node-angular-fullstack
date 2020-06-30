import { Component, OnInit } from '@angular/core';
import { EventsService } from '../.././services/events.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.component.html',
  styleUrls: ['./editevent.component.css']
})
export class EditeventComponent implements OnInit {
  eventId: any;
  events: any;
  event: any;
  errorMsg: any;

  constructor(private actRoute: ActivatedRoute, private eventsServ: EventsService, private fb: FormBuilder, private router: Router) { }

  minDate = new Date(new Date().setDate(new Date().getDate()));

  //maxDate = new Date();
  maxDate =  new Date(new Date().setDate(this.minDate.getDate()));
  
  public editeventForm = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required]],
    location: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      console.log(id)
      this.eventId = id;
      console.log(this.eventId);
      this.event = this.eventsServ.getEventById(this.eventId).subscribe(
        (data) => {this.event = data; console.log(data);
          this.editeventForm = this.fb.group({
            id: [this.eventId],
            name: [this.event.name, [Validators.required, Validators.minLength(3)]],
            category: [this.event.category, [Validators.required]],
            location: [this.event.location, [Validators.required]],
            startDate: [this.event.startDate, [Validators.required]],
            endDate: [this.event.endDate, [Validators.required]]
          });
        },
        (error) => {this.errorMsg = error; console.log(error); }
      );
    });
  }
  
  get name(){
    return this.editeventForm.get('name');
  }

  get category(){
    return this.editeventForm.get('category');
  }

  get location(){
    return this.editeventForm.get('location');
  }

  get startDate(){
    return this.editeventForm.get('startDate');
  }

  get endDate(){
    return this.editeventForm.get('endDate');
  }

  update(employeeId, editemployeeForm){
    this.eventsServ.updateEvent(this.eventId, this.editeventForm.value).subscribe(
      (data) => {
        console.log(data);
        this.eventsServ.getEvents().subscribe(
          (data) => this.eventsServ.events = data,
          (error) => this.errorMsg = error
        )
      },
      (error) => {this.errorMsg = error; console.log(error); }
    );
    this.router.navigate(['/dashboard/eventslist']);
  }

  cancelForm(){
    this.router.navigate(['/dashboard/eventslist']);
  }

}
