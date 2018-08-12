import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PhonelogModalComponent } from '../app/components/phonelog/phonelog-modal/phonelog-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title = 'Axiona';
  public heartbeat = false;
  public loggedIn = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');
    translate.use('en');
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

  public addPhonelog(): void {
    const dialogRef = this.dialog.open(PhonelogModalComponent, {
      width: '66%'
    });
  }

  public switchLanguage(language: string) {
    this.translate.use(language);
    
  }
}
