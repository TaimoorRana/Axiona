import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CasefilesComponent } from './casefiles.component';
import { MaterialsModule } from '../../../../modules/materials.module';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { MockAuthenticationService } from '../../../../mocks/MockAuthenticationService';
import { CasefileService } from '../../../../services/casefile.service';
import { MockCasefileService } from '../../../../mocks/MockCasefileService';

describe('CasefilesComponent', () => {
  let component: CasefilesComponent;
  let fixture: ComponentFixture<CasefilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ CasefilesComponent ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: CasefileService, useClass: MockCasefileService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({_id: 'frontendtest'}) } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasefilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
