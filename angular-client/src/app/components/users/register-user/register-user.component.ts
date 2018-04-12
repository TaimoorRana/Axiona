import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../classes/user';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user: User = {
    name: '',
    pronouns: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // selected role is 'user' by default
  };
  loading = false;
  error = false;
  msg = '';

  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  /**
   * Register a new user account
   *
   * @memberof LoginComponent
   */
  public signUp() {
    this.loading = true;
    this.error = false;
    this.authenticationService.signUp(this.user).subscribe(data => {
      this.loading = false;

      if (!data.error) {
        this.alertModal('New user successfully created.').subscribe(() => {
          this.router.navigateByUrl('/dashboard/users');
        });
      } else {
        this.alertModal('Could not add new user.').subscribe();

        this.loading = false;
        this.error = true;
        this.msg = '';

        if (Array.isArray(data.error.msg)) {
          for (const i in data.error.msg) {
            if (data.error.msg[i] != null) {
              this.msg += data.error.msg[i].msg + '\n';
            }
          }
        } else {
          this.msg = data.error.msg;
        }
      }
    });
  }

  /**
   * Alert user of response success or fail.
   * 
   * @param {any} message 
   * @returns {Observable<any>} 
   * @memberof RegisterUserComponent
   */
  alertModal(message): Observable<any> {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    return dialogRef.afterClosed();
  }

}
