import { Component,ViewChild, OnInit,Output,EventEmitter } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { Housing } from '../../../classes/housing';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})

export class AddResourceComponent implements OnInit {
  
  @ViewChild('f') myNgForm;
  resourceTypes = [ 'Housing', 'Medical' ];
  @Output() addedResource = new EventEmitter();
  form: FormGroup;
  phoneregex = /^(?:\+?1[-. ]?)?(\(([0-9]{3})\)|([0-9]{3}))[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  emailregex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  constructor(private fb: FormBuilder, private resourceService: ResourceService, public dialog: MatDialog, private router: Router
  ) {
    this.createForm();
  }


  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      kind: this.resourceTypes[0],
      name: ['', Validators.required],
      email: ['',Validators.pattern(this.emailregex)],
      telephone: ['', Validators.pattern(this.phoneregex)],
      location: [''],
      notes: [''],
      term: [''],
      gender: [''],
      constraints: [''],
      without_cost: [''],
      waitlist_time: [''],
      schedule_availability: ['']
    });
  }

  /**
   * Alert user of response success or fail.
   *
   * @param {any} message
   * @memberof AddResourceComponent
   */
  alertModal(message): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.form.reset();
      this.addedResource.emit();
    });
  }

  /**
   * Submit new resource
   * @memberof AddResourceComponent
   */
  submit() {
    this.resourceService.save(this.form.value['kind'].toLowerCase(), this.form.value)
      .subscribe(data => {
        if (data.hasOwnProperty('errmsg')) {
          this.alertModal('Could not add new resource.');
        } else {
          this.alertModal('New resource successfully added.');
          this.myNgForm.resetForm();
          this.router.navigateByUrl('/resources');
        }
      });
  }

}
