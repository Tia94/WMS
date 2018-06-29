import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  private subscription: ISubscription;

  public title: string = "Manage Users";
  public users: Array<any> = new Array<any>();
  public user: any;
  public selectedUser: any;
  public newUser: boolean;
  public displayDialog: boolean;

  public cols: Array<any> = new Array<any>();

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe(data => this.users = data);

    this.cols = [
      { field: "username", header: "Username" },
      { field: "password", header: "Password" },
      { field: "firstname", header: "First Name" },
      { field: "lastname", header: "Last Name" },
      { field: "email", header: "Email" },
      { field: "telephoneNumber", header: "Tel" },
      { field: "address", header: "Address" },
      { field: "role", header: "Role" },
      { field: "isActive", header: "Active" },
    ];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showDialog() {
    this.newUser = true;
    this.user = {};
    this.displayDialog = true;
  }

  closeDialog() {
    this.newUser = false;
    this.user = null;
    this.displayDialog = false;
  }

  save() {
    let users = [...this.users];
    if (this.newUser) {
      users.push(this.user);
      this.userService.add(this.user.username, this.user.password, this.user.firstname, this.user.lastname, this.user.email, this.user.telephoneNumber, this.user.address,
        this.user.role, this.user.isActive)
        .subscribe(response => {
        });
    }
    else {
      users[this.users.indexOf(this.selectedUser)] = this.user;
      this.userService.update(this.user.id, this.user.username, this.user.password, this.user.firstname, this.user.lastname, this.user.email, this.user.telephoneNumber, this.user.address,
        this.user.role, this.user.isActive)
        .subscribe(response => {
        });
    }

    this.users = users;
    this.closeDialog();
  }

  delete() {
    let index = this.users.indexOf(this.selectedUser);

    if (index !== -1) {
      this.userService.delete(this.selectedUser.id)
        .subscribe(response => {
          this.users = this.users.filter((val, i) => i != index);
          this.closeDialog();
        });
    }
  }


  onRowSelect(event) {
    this.newUser = false;
    this.user = this.cloneUser(event.data);
    this.displayDialog = true;
  }

  cloneUser(c: any): any {
    let user = {};
    for (let prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }

}
