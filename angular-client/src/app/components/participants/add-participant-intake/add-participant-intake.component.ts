import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';
import { ParticipantService } from '../../../services/participant.service';

@Component({
  selector: 'app-add-participant-intake',
  templateUrl: './add-participant-intake.component.html',
  styleUrls: ['./add-participant-intake.component.css']
})
export class AddParticipantIntakeComponent implements OnInit {

  // For use for forms as prototypes
  organizationName = 'AGIR';
  isAlreadyAParticipantEmail = false;
  intakeMethods = [ 'in person', 'over the phone', 'other'];
  isLinear = false;
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
    this.createForms();
   }

  ngOnInit() {
  }

  createForms() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      pronouns: '',
      service: '',
      username: '',
      email: '',
      address: ''
    });
    this.referralForm = this.fb.group({
      referral: ['', Validators.required],
      contactMethod: '',
      intakeDoneBy: '',
      intakeMethod: this.intakeMethods[0],
      criteriaProcess: '',
      criteriaIdentity: ''
    });
    this.contactForm = this.fb.group({
      name: '',
      telephone: '',
      telephonePrivate: '',
      telephoneVoicemail: '',
      telephoneVoicemailName: '',
      telephoneVoicemailAgir: '',
      telephoneText: '',
      telephoneTextName: '',
      telephoneTextAgir: '',
      email: ['', Validators.email],
      emailPrivate: '',
      notifications: '',
      isNotifiedViaEmail: '',
      isNotifiedViaText: '',
      isNotifiedViaFacebook: ''
    });
    this.requestForm = this.fb.group({
      goal: '',
      type: '',
      detentionDuration: '',
      submissionDate: '',
      upcomingDates: '',
      hasLawyer: '',
      isSearchingLawyer: '',
      otherInfo: ''
    });
    this.generalForm = this.fb.group({
      languages: '',
      countries: '',
      canadianArrivalDate: '',
      montrealArrivalDate: '',
      neighbourhood: ''
    });
    this.dailyLifeForm = this.fb.group({
      accomodation: '',
      economic: '',
      healthcare: '',
      wellbeing: '',
      activities: '',
      hasActivitiesWithRelatives: '',
      hasActivitiesWithFriends: '',
      hasActivitiesWithFaithGroups: ''
    });
    this.servicesForm = this.fb.group({
      praida: '',
      praidaInfo: '',
      ymca: '',
      ymcaInfo: '',
      lgbtq: '',
      migrant: '',
      other: ''
    });
    this.accessibilityForm = this.fb.group({
      accessNeeds: ''
    });
    this.otherInfoForm = this.fb.group({
      otherInfo: '',
      providedInfo: ''
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
