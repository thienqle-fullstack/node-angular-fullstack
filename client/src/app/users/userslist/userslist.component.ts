import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  public users;
  public errorMsg;

  dtOptions = {
    order: [[ 1, 'desc' ]],
    lengthMenu: [5, 10, 15, 20, 25, 50 ],
    responsive: true
  }

  constructor(public UsersServ: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.UsersServ.getUsers().subscribe(
      (data) => this.UsersServ.users = data,
      (error) => this.errorMsg = error
    )
  }

  selectuser(user){
    console.log(user)
    //this.router.navigate(['/employeelist', employee.id]);
  }

  editUser(user){
    console.log(user)
    //this.router.navigate(['/editemployee', user.id]);
  }


  deleteUser(user){
    // const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //   width: '350px',
    //   data: "Do you confirm the deletion of this data?"
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {
    //     console.log('Yes clicked');
    //     this.empService.deleteEmployee(employee.id).subscribe(() => {
    //       this.empService.getEmployees().subscribe(
    //         (data) => this.empService.employees = data,
    //         (error) => this.errorMsg = error
    //       )
    //     })
    //   }
    // });
  }

}
