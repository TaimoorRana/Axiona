import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-phonelog',
  templateUrl: './add-phonelog.component.html',
  styleUrls: ['./add-phonelog.component.css']
})
export class AddPhonelogComponent implements OnInit {

  @ViewChild('f') myNgForm;
  @Output() loggedPhonecall = new EventEmitter();
  phonelog: FormGroup;
  callertype = [
    'Trans person',
    'Organization',
    'Social worker',
    'Other person',
  ];
  phoneregex = /^(?:\+?1[-. ]?)?(\(([0-9]{3})\)|([0-9]{3}))[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  constructor(
    private phonelogService: PhonelogService,
    private form: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
    this.createForm();
  }

  /**
   * Initialize form
   *
   * @memberof AddPhonelogComponent
   */
  createForm() {
    this.phonelog = this.form.group({
      name: ['', Validators.required],
      pronouns: '',
      user: '', // TODO: ask anna how to get user info (id and name) at this moment
      urgent: false,
      phonenumber: ['', Validators.pattern(this.phoneregex)],
      subject: '',
      message: '',
      notes: '',
      callertype: this.callertype[0],
    });
  }

  /**
   * Alert user of response success or fail.
   *
   * @param {any} message
   * @memberof AddPhonelogComponent
   */
  alertModal(message): Observable<any> {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    return dialogRef.afterClosed();

  }


  /**
   * Submit new phonelog entry.
   *
   * @memberof AddPhonelogComponent
   */
  submit() {
    const formModel = this.phonelog.value;

    this.phonelogService.save(formModel)
      .subscribe(data => {
        if (data.hasOwnProperty('errors')) {
          this.alertModal('Could not add new phonelog entry.').subscribe();
        } else {
          this.alertModal('Phonelog entry successfully added.').subscribe( () => {
            this.myNgForm.resetForm();
            this.router.navigateByUrl('/dashboard/phonelog');
          });
        }
      });
  }

}
