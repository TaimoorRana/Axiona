import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {};
  loading = false;
  error = false;
  msg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  /**
   * Login with account credentials
   *
   * @memberof LoginComponent
   */
  public login() {
    this.loading = true;
    this.msg = '';
    this.error = false;
    this.authenticationService.login(this.user.email, this.user.password).subscribe(data => {
      this.loading = false;
      let language=data.profile.language;
      this.translate.use(language);
      if (!data.error) {
        this.authenticationService.loggedIn = true;

        this.router.navigateByUrl('/dashboard/activity');
      } else {
        this.authenticationService.loggedIn = false;
        this.loading = false;
        this.error = true;
        this.msg = data.error.msg;
      }
    });
  }

}
