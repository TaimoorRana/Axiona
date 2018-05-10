import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CasefileService } from '../../services/casefile.service';
import { Casefile } from '../../classes/case';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-casefiles',
  templateUrl: './casefiles.component.html',
  styleUrls: ['./casefiles.component.css']
})
export class CasefilesComponent implements OnInit {

  @Input() orderedCases: any;
  @Output() loadParticipant = new EventEmitter();

  constructor(
    private casefileService: CasefileService
  ) { }

  ngOnInit() {
  }

}
