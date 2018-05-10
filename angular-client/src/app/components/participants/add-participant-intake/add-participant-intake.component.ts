import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';
import { ParticipantService } from '../../../services/participant.service';

@Component({
  selector: 'app-add-participant-intake',
  templateUrl: './add-participant-intake.component.html',
  styleUrls: ['./add-participant-intake.component.css']
})
export class AddParticipantIntakeComponent implements OnInit {

  form: FormGroup;
  organizationName = 'AGIR';
  // phoneregex = /^(?:\+?1[-. ]?)?(\(([0-9]{3})\)|([0-9]{3}))[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  isAlreadyAParticipantEmail = false;
  intakeMethods = [ 'in person', 'over the phone', 'other'];

  isLinear = true;
  referralForm: FormGroup;
  contactForm: FormGroup;
  requestForm: FormGroup;
  generalForm: FormGroup;
  dailyLifeForm: FormGroup;
  servicesForm: FormGroup;
  accessibilityForm: FormGroup;
  otherInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      referral: ['', Validators.required],
      contactMethod: [''],
      intakeDoneBy: [''],
      intakeMethod: this.intakeMethods[0],
      name: ['', Validators.required],
      pronouns: [''],
      telephone: [''],
      service: [''],
      username: [''],
      email: [''],
      address: ['']
    });
    this.referralForm = this.fb.group({
      name: ['']
    });
    this.contactForm = this.fb.group({
      name: ['']
    });
  }

  onKey(attribute: String, value: String) {
    // const query = attribute + '=' + value;
    // const that = this;
    // if (value.length > 0) {
    //   this.participantService.search(query)
    //     .subscribe(data => {
    //       if (attribute === 'email') {
    //         that.isAlreadyAParticipantEmail = (data === true) ? true : false;
    //       }
    //     });
    // }
  }

  onSubmit() {
    console.log('Submit form');
  }

}