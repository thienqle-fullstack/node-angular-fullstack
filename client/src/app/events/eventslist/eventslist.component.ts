import { Component, OnInit } from '@angular/core';
import { EventsService } from '../.././services/events.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from 'src/app/information-dialog/information-dialog.component';

@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.css']
})
export class EventslistComponent implements OnInit {

  public events;
  public errorMsg;

  dtOptions = {
    order: [[ 1, 'desc' ]],
    lengthMenu: [5, 10, 15, 20, 25, 50 ],
    responsive: true
  }
  breakpoint: number;

  constructor(public eventsServ: EventsService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1:6;
    this.eventsServ.getEvents().subscribe(
      (data) => this.eventsServ.events = data,
      (error) => this.errorMsg = error
    )
  }
  
  onResize(event){
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 6;
  }

  selectEvent(event){
    console.log(event)
    //this.router.navigate(['/employeelist', employee.id]);
    let content = {
      title: 'Event Details',
      objects: event,
      id: event.id
    }
    const dialogRef = this.dialog.open(InformationDialogComponent, {
      width: '50%',
      data: content
    });
  }

  editEvent(event){
    console.log(event)
    this.router.navigate(['/editevent', event.id]);
  }

  deleteEvent(event){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the deletion of this data?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('Yes clicked');
        this.eventsServ.deleteEvent(event.id).subscribe(() => {
          this.eventsServ.getEvents().subscribe(
            (data) => this.eventsServ.events = data,
            (error) => this.errorMsg = error
          )
        })
      }
    });
  }

}
