import { Component, OnInit, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() click: boolean;
  @Output() notify: EventEmitter<boolean> = new EventEmitter();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.click = false;
    this.notify.emit(this.click);
  }


  changeRoute(){
    this.click = true;
    this.notify.emit(this.click);
    console.log("just click!")
  }

}
