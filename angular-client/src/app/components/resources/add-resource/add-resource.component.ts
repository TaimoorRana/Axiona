import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { Housing } from '../../../classes/housing';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {
  
  resourceTypes = [ 'Housing', 'Medical' ];
  form: FormGroup;
  phoneregex = /^(\d){3}(-|\.|\s|\()?(\d){3}(-|\.|\s|\()?(\d){4}$/m;


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
      email: [''],
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
  alertModal(message): Observable<any> {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    return dialogRef.afterClosed();
  }

  /**
   * Submit new resource
   * @memberof AddResourceComponent
   */
  submit() {
    this.resourceService.save(this.form.value['kind'].toLowerCase(), this.form.value)
      .subscribe(data => {
        if (data.hasOwnProperty('errors')) {
          this.alertModal('Could not add new resource.').subscribe( () => {
            console.log(data);
          });
        } else {
          this.alertModal('New resource successfully added.').subscribe( () => {
            this.form.reset({});
            this.router.navigateByUrl('/resources');
          });
        }
      });
  }

}
