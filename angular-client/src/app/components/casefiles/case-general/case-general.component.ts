import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Casefile } from '../../../classes/case';
import { CasefileService } from '../../../services/casefile.service';


@Component({
  selector: 'app-case-general',
  templateUrl: './case-general.component.html',
  styleUrls: ['./case-general.component.css']
})
export class CaseGeneralComponent implements OnInit {

  @Input() casefile;
  casefileFormNote: FormGroup;
  isEditingSelectedResource = true;

  constructor(
    private casefileService: CasefileService,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    this.setEditedCasefile();
  }

  /**
   * Initialize forms
   */
  setEditedCasefile() {
    this.isEditingSelectedResource = (this.casefile.selectedResource) ? false : true;
    this.createFormNote();
  }

  /**
   * Create form for casefile note
   */
  createFormNote() {
    this.casefileFormNote = this.form.group({
      notes: this.casefile.notes[0] || ''
    });
  }

  /**
   * Update casefile note as user enters text
   */
  updateCaseNote() {
    const noteFormModel = this.casefileFormNote.value;
    this.casefileService.updateCaseNote(this.casefile._id, noteFormModel).subscribe();
  }

}
