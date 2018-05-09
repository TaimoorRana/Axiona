import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../../modules/materials.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CaseGenericComponent } from './case-generic.component';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../services/mocks/MockAuthenticationService';
import { CasefileService } from '../../../services/casefile.service';
import { MockCasefileService } from '../../../services/mocks/MockCasefileService';
import { ResourceService } from '../../../services/resource.service';
import { MockResourceService } from '../../../services/mocks/MockResourceService';
import { ParticipantService } from '../../../services/participant.service';
import { MockParticipantService } from '../../../services/mocks/MockParticipantService';

import { Router } from '@angular/router';

describe('CaseGenericComponent', () => {
  let component: CaseGenericComponent;
  let fixture: ComponentFixture<CaseGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule, MatDialogModule, FormsModule ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {participant: {_id: 'testID'}}},
        {provide: AuthenticationService, useClass: MockAuthenticationService },
        {provide: CasefileService, useClass: MockCasefileService },
        {provide: ResourceService, useClass: MockResourceService},
        {provide: ParticipantService, useClass: MockParticipantService},
        {provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }
      ],
      declarations: [ CaseGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
