import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PhonelogModalComponent } from './phonelog-modal.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../services/mocks/MockAuthenticationService';


describe('PhonelogModalComponent', () => {
  let component: PhonelogModalComponent;
  let fixture: ComponentFixture<PhonelogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhonelogModalComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: MatDialogRef, useValue: {}}, 
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
    .compileComponents();
}));

beforeEach(() => {
  fixture = TestBed.createComponent(PhonelogModalComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

it('should create', () => {
  expect(component).toBeTruthy();
});
});
