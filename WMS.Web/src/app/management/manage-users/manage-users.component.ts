import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { UserService } from '../user.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  private subscription: ISubscription;

  public title: string = "Manage Users";
  public users: Array<any> = new Array<any>();
  public user: any;
  public selectedUser: any;
  public newUser: boolean;
  public displayDialog: boolean;

  public cols: Array<any>;
  public roles: Array<any>;
  public selectedRole: any = {};

  constructor(private userService: UserService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.subscription = this.userService.list().subscribe(data => this.users = data);

    this.cols = [
      { field: "username", header: "Username" },
      { field: "firstname", header: "First Name" },
      { field: "lastname", header: "Last Name" },
      { field: "email", header: "Email" },
      { field: "telephoneNumber", header: "Tel" },
      { field: "address", header: "Address" },
      { field: "role", header: "Role" },
      // { field: "isActive", header: "Active" },
    ];

    this.roles = [
      { name: "Admin", value: 'Admin' },
      { name: 'Client', value: 'Client' },
      { name: 'Driver', value: 'Driver' },
      { name: 'Store Keeper', value: 'Keeper' }
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
    let username = this.user.username;
    this.user.role = this.selectedRole.value;
    if (this.newUser) {
      users.push(this.user);
      this.userService.add(this.user.username, this.user.password, this.user.firstname, this.user.lastname, this.user.email, this.user.telephoneNumber, this.user.address,
        this.selectedRole.value, this.user.isActive)
        .then(_ => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `User '${username}' added successfully.` });
        });
    }
    else {
      users[this.users.indexOf(this.selectedUser)] = this.user;
      this.userService.update(this.user.id, this.user.username, this.user.password, this.user.firstname, this.user.lastname, this.user.email, this.user.telephoneNumber,
        this.user.address, this.selectedRole.value, this.user.isActive)
        .then(_ => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `User '${username}' updated successfully.` });
        });
    }

    this.users = users;
    this.closeDialog();
  }

  delete() {
    let index = this.users.indexOf(this.selectedUser);

    if (index !== -1) {
      let username = this.selectedUser.username;
      this.userService.delete(this.selectedUser.id)
        .then(_ => {
          this.users = this.users.filter((val, i) => i != index);
          this.closeDialog();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `User '${username}' deleted successfully.` });
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
