import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-phonelog',
  templateUrl: './edit-phonelog.component.html',
  styleUrls: ['./edit-phonelog.component.css']
})
export class EditPhonelogComponent implements OnInit {
  allWorkers: [any];
  @Input() log: Phonelog;
  @Output() cancel = new EventEmitter();
  editphonelog: FormGroup;
  editingLog = Phonelog;
  date;
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
    private form: FormBuilder,
    private phonelogService: PhonelogService,
    private userService: UserService,
  ) { this.date = new Date(); }

  ngOnInit() {
    this.createForm();
    this.loadAllWorkers();
  }

  loadAllWorkers() {
    this.userService.getAllNames()
      .subscribe( (data: [any]) => {
        this.allWorkers = data;
      });
  }

  createForm() {
    this.editphonelog = this.form.group({
      name: [this.log.name, Validators.required],
      pronouns: this.log.pronouns || this.pronouns[0],
      language: this.log.language || this.language[0],
      urgent: this.log.urgent,
      phonenumber: [this.log.phonenumber || '', Validators.pattern(this.phoneregex)],
      subject: this.log.subject || this.subjects[0],
      assignedTo: this.log.assignedTo,
      message: this.log.message || '',
      callertype: this.log.callertype,
      date: this.log.date
    }, { validator: this.dateLessThan('date') });
  }


  dateLessThan(date: string) {
    return (editphonelog: FormGroup): { [key: string]: any } => {
      const f = editphonelog.controls[date];
      const t = Date.now();
      if (f.value > t) {
        return {
          dates: 'Date before today'
        };
      }
      return {};
    };
  }

  update(id, log) {
    const formModel = this.editphonelog.value;
    this.phonelogService.update(id, formModel)
      .subscribe(data => {
        this.cancel.emit();
      });
  }
}
