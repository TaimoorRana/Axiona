import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-phonelog',
  templateUrl: './phonelog.component.html',
  styleUrls: ['./phonelog.component.css']
})
export class PhonelogComponent implements OnInit {

  @Input() isLoggingCall;
  navLinks = [
    {
      label: 'View Phone Log',
      path: './view-phonelog'
    },
    {
      label: 'Log a phone call',
      path: './phonelog-tab'
    }
  ];

  constructor(
    public authService: AuthenticationService,
    public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
    this.router.navigateByUrl('login');
    }
    console.log(this.isLoggingCall);
  }

}
