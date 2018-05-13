import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';
import { UserService } from '../../../services/user.service';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../classes/task';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-phonelog',
  templateUrl: './add-phonelog.component.html',
  styleUrls: ['./add-phonelog.component.css']
})
export class AddPhonelogComponent implements OnInit {
  allWorkers: [any];
  @ViewChild('f') myNgForm;
  @Output() loggedPhonecall = new EventEmitter();
  phonelog: FormGroup;
  phonelogtask: Task;
  callertype = [
    'Trans person',
    'Organization',
    'Social worker',
    'Other person',
  ];
  language = [
    'Français',
    'English',
    'Español',
  ];
  pronouns = [
    'undisclosed',
    'she/her',
    'they/them',
    'he/him'
  ];
  subjects = [
    'Housing',
    'Medical',
    'Legal',
    'Accompaniment',
    'Financial',
    'Name Change',
    'Food Security',
    'Job Finding',
    'Immigration',
    'Victims of Violence',
    'Sexual Health',
    'Information '
  ];
  phoneregex = /^(?:\+?1[-. ]?)?(\(([0-9]{3})\)|([0-9]{3}))[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  constructor(
    private phonelogService: PhonelogService,
    private userService: UserService,
    private taskService: TaskService,
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
    this.loadAllWorkers();
  }

  /**
   * Initialize form
   *
   * @memberof AddPhonelogComponent
   */
  createForm() {
    this.phonelog = this.form.group({
      name: ['', Validators.required],
      pronouns: this.pronouns[0],
      user: '',
      language: this.language[0],
      urgent: false,
      phonenumber: ['', Validators.pattern(this.phoneregex)],
      assignedTo: '',
      subject: this.subjects[0],
      message: '',
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

  loadAllWorkers() {
    this.userService.getAll()
      .subscribe( (data: [any]) => {
        this.allWorkers = data;
      });
  }

  assignFieldsToTask(): void {
    this.phonelogtask = new Task();
    this.phonelogtask.description = this.phonelog.value.name +
     '(' + this.phonelog.value.pronouns + ')' + 
     this.phonelog.value.phonenumber;
     this.phonelogtask.user = this.phonelog.value.assignedTo;
     this.phonelogtask.kind = 'phonelog';
  }

  /**
   * Submit new phonelog entry.
   *
   * @memberof AddPhonelogComponent
   */
  submit() {
    if (this.phonelog.value.assignedTo !== '') {
      this.assignFieldsToTask();

      this.taskService.save(this.phonelogtask)
        .subscribe(data => {
          if (data.hasOwnProperty('errors')) {
            this.alertModal('Could not add new task.').subscribe();
          } else {
            this.alertModal('Task successfully added.').subscribe();
          }
        });
    }
    this.phonelogService.save(this.phonelog.value)
      .subscribe(data => {
        if (data.hasOwnProperty('errors')) {
          this.alertModal('Could not add new phonelog entry.').subscribe();
        } else {
          this.alertModal('Phonelog entry successfully added.').subscribe( () => {
            this.myNgForm.resetForm();
            this.loggedPhonecall.emit();
            this.phonelogService.emitPhoneLogging();
          });
        }
      });
  }

}
