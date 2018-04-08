import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  editingUser = User;
  public users;
  public sortProperty = 'name';
  public reverse = false;
  public query: string;

  constructor(private userService: UserService, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    } else {
      this.loadUsers();
    }
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    });
  }

  edit(user) {
    this.editingUser = user;
  }

}
