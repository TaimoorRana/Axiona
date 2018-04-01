import { Component, OnInit, Inject,ViewChild,Output,EventEmitter } from '@angular/core';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../classes/participant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {
  @ViewChild('f') myNgForm;
  @Output() addedParticipant = new EventEmitter();
  form: FormGroup;
  socialmedia: FormGroup;
  phoneregex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/ 
  emailregex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  isAlreadyAParticipantEmail = false;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public router: Router) {
    this.createForm();
  }



  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      pronouns: [''],
      telephone: ['', Validators.pattern(this.phoneregex)],
      service: [''],
      username: [''],
      email: ['',Validators.pattern(this.emailregex)],
      address: ['']
    });
  }


  /**
   * Verify if attribute and value of the given input has
   * already been associated to a participant.
   *
   * @param {*} event
   * @memberof AddParticipantComponent
   */
  onKey(attribute: String, value: String) {
    const query = attribute + '=' + value;
    const that = this;
    if (value.length > 0) {
      this.participantService.search(query)
        .subscribe(data => {
          if (attribute === 'email'){
            that.isAlreadyAParticipantEmail = (data === true) ? true : false;
          }
        });
    }
  }

  /**
   * Alert user of response success or fail.
   *
   * @param {any} message
   * @memberof AddParticipantComponent
   */
  alertModal(message): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.form.reset();
      this.addedParticipant.emit();
    });

  }


  /**
   * Submit new participant profile information.
   *
   * @memberof AddParticipantComponent
   */
  onSubmit() {
    this.participantService.save(this.form.value)
      .subscribe(data => {
        if (data.hasOwnProperty('errmsg')) {
          this.alertModal('Could not add new participant.');
        } else {
          this.alertModal('New participant successfully added.');
          this.myNgForm.resetForm();
        }
      });
  }
}
