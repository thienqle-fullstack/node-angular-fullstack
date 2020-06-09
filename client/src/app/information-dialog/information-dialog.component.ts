import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-information-dialog',
  templateUrl: './information-dialog.component.html',
  styleUrls: ['./information-dialog.component.css']
})
export class InformationDialogComponent implements OnInit {


  bodies;
  title;
  headers;
  id;

  constructor(
    public dialogRef: MatDialogRef<InformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.id = data.id;
    this.bodies = Object.values(data.objects);
    this.title = data.title;
    this.headers = Object.keys(data.objects)
    console.log(this.headers)
    console.log(this.bodies)
  
  }

  ngOnInit(): void {
  }

//   onNoClick(): void {
//     this.dialogRef.close();
// }

}
