import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {TranslateService} from '@ngx-translate/core';
import { UserService } from './services/user.service';
import { CookieService } from '../../node_modules/ngx-cookie-service/cookie-service/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Axiona';
  userId;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService,
    private userService: UserService,
    private cookieService: CookieService
  ) {
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');
  }
  public heartbeat = false;
  public loggedIn = false;

  switchLanguage(language: string) {
    this.translate.use(language);
    this.userId = this.cookieService.get('UserId');
    this.userService.changeLanguage(this.userId,language);
}
  ngOnInit() {
    this.authenticationService.heartbeat().subscribe(data => {
      if (!data.loggedIn) {
        this.router.navigateByUrl('/login');
        this.authenticationService.loggedIn = false;
        this.heartbeat = true;
      } else {
        this.authenticationService.loggedIn = true;
        this.heartbeat = true;
      }
    }, err => {
      this.heartbeat = true;
    });
  }

  public logout() {
    this.authenticationService.logout().subscribe(data => {
      this.router.navigateByUrl('/login');
      this.authenticationService.loggedIn = false;
    }, err => {
      console.log(err);
    });
  }
}
