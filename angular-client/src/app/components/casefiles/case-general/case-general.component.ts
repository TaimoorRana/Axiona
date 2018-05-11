import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Casefile } from '../../../classes/case';
import { CasefileService } from '../../../services/casefile.service';


@Component({
  selector: 'app-case-general',
  templateUrl: './case-general.component.html',
  styleUrls: ['./case-general.component.css']
})
export class CaseGeneralComponent implements OnInit {

  @Input() casefile;
  @Output() loadParticipant = new EventEmitter();
  casefileFormNote: FormGroup;
  casefileFormContactedResources: FormGroup;
  casefileFormSelectedResource: FormGroup;
  isEditingSelectedResource = true;
  isDateRange = true;
  startDate = new Date();
  dateRange = ['Switch to date range', 'Switch to single date'];
  dateRangeText = this.dateRange[1];

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
    this.createFormSelectedResource();
    this.createFormContactedResources();
    this.setContactedResources(this.casefile.contactedResources);
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
 * Create form for selected resource
 */
  createFormSelectedResource() {
    this.casefileFormSelectedResource = this.form.group({
      resource: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, (this.isDateRange) ? Validators.required : null]
    });
  }

  /**
  * Create form for array of contacted resources
  */
  createFormContactedResources() {
    this.casefileFormContactedResources = this.form.group({
      resources: this.form.array([])
    });
  }

  /**
   * Set resources as form groups for contacted resources form array
   */
  setContactedResources(resources:  ContactedResource[]) {
    const resourceFGs = resources.map(resource => this.form.group(resource));
    const resourceFormArray = this.form.array(resourceFGs);
    this.casefileFormContactedResources.setControl('resources', resourceFormArray);
  }

  get resources(): FormArray {
    return this.casefileFormContactedResources.get('resources') as FormArray;
  }

  /**
   * Update casefile note as user enters text
   */
  updateCaseNote() {
    const noteFormModel = this.casefileFormNote.value;
    this.casefileService.updateCaseNote(this.casefile._id, noteFormModel).subscribe();
  }

  /**
   * Update casefile's resource date of contact
   */
  updateCaseResourceDate(isResourceContacted, resourceIndex): void {

    const casefileID = this.casefile._id;
    const resourceID = this.casefileFormContactedResources.value.resources[resourceIndex].resource._id;
    const dateContacted = this.casefileFormContactedResources.value.resources[resourceIndex].dateContacted;
    let date;
    if (isResourceContacted) {
      date = (dateContacted != null) ? dateContacted : new Date();
    } else {
      date = null;
    }

    this.casefile.contactedResources[resourceIndex].dateContacted = date;
    this.casefile.contactedResources[resourceIndex].isContacted = isResourceContacted;
    this.setContactedResources(this.casefile.contactedResources);

    this.casefileService.updateCaseContactedResource(
      casefileID,
      resourceID,
      { 'isContacted': isResourceContacted, 'dateContacted': date }
    ).subscribe();
  }

  /**
   * Update casefile's resource note
   *
   * @param {any} isEditing
   * @param {any} resourceIndex
   * @memberof CasefilesComponent
   */
  updateCaseResourceNote(isEditing, resourceIndex) {
    const casefileID = this.casefile._id;
    const resourceID = this.casefileFormContactedResources.value.resources[resourceIndex].resource._id;
    let comment;
    if (isEditing) {
      comment = null;
    } else {
      comment = this.casefileFormContactedResources.value.resources[resourceIndex].note;
    }
    this.casefile.contactedResources[resourceIndex].note = comment;
    this.setContactedResources(this.casefile.contactedResources);

    this.casefileService.updateCaseContactedResource(
      casefileID,
      resourceID,
      { 'note': comment }).subscribe();
  }

  /**
   * Update casefile with selected resource
   */
  updateCaseSelectedResource(selectedResource) {

    this.casefileFormSelectedResource.patchValue({
      resource: selectedResource.resource,
      startDate: selectedResource.startDate,
      endDate: selectedResource.endDate
    });

    this.isEditingSelectedResource = true;
  }

  /**
 * Save selected resource to database
 */
  saveCaseSelectedResource(casefile) {
    const selectedResourceFormModel = this.casefileFormSelectedResource.value;
    selectedResourceFormModel.resource = selectedResourceFormModel.resource.resource;
    selectedResourceFormModel.endDate = (this.isDateRange) ? selectedResourceFormModel.endDate : null;
    const selectedResourceObject = { 'selectedResource': selectedResourceFormModel };

    this.casefileService.updateCaseSelectedResource(casefile._id, selectedResourceObject).subscribe(data => {
      casefile.selectedResource = selectedResourceFormModel;
      this.isEditingSelectedResource = false;
    });
  }

  /**
 * Clear a selected resource
 */
  removeCaseSelectedResource(casefile) {
    this.casefileService.updateCaseSelectedResource(casefile._id, { 'selectedResource': null }).subscribe(data => {
      casefile.selectedResource = null;
      this.casefileFormSelectedResource.reset({});
    });
  }


  /**
   * Switch between date range to single date
   */
  switchDateRange() {
    this.isDateRange = !this.isDateRange;
    this.dateRangeText = (this.isDateRange) ? this.dateRange[1] : this.dateRange[0];
    this.createFormSelectedResource();
  }

  /**
* Complete a casefile
*/
  completeCasefile(casefile, casefileIndex): void {
    this.casefile.status = 'Completed';
    this.casefileService.updateCaseStatus(casefile._id, { status: 'Completed' }).subscribe();
  }


  /**
   * Reopen a casefile
   */
  reopenCasefile(casefile, casefileIndex): void {
    this.casefile.status = 'In progress';
    this.casefileService.updateCaseStatus(casefile._id, { status: 'In progress' }).subscribe();
  }

  /**
   * Deletes selected casefile
   */
  deleteCasefile(casefileID): void {
    this.casefileService.delete(casefileID)
      .subscribe(result => {
        this.loadParticipant.emit();
      });
  }

}

export class ContactedResource {
  note = '';
  resource = '';
  isContacted = '';
  dateContacted = '';
  _id = '';
}
