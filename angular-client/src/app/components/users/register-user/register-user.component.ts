import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../classes/user';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  form: FormGroup;
  emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordregex = /^\w{4,12}/;

  loading = false;
  error = false;
  msg = '';

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder, 
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.createForm();
   }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      pronouns: [''],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailregex)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.passwordregex)])],
      confirmPassword: ['', Validators.required],
      role: 'user'
    }, {validator: this.passwordsMatch});
  }

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
    this.authenticationService.signUp(this.form.value).subscribe(data => {
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

  passwordsMatch(formGroup: FormGroup) {
    let confirmPasswordInput = formGroup.controls['confirmPassword'];
    if (formGroup.controls['password'].value !== confirmPasswordInput.value) {
      return confirmPasswordInput.setErrors({notEquivalent: true});
    } else {
      return confirmPasswordInput.setErrors(null);
    }
  }

}
