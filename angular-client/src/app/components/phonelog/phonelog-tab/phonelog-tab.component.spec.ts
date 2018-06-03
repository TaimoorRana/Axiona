import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialsModule } from '../../../modules/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PhonelogTabComponent } from './phonelog-tab.component';
import { AddPhonelogComponent } from '../add-phonelog/add-phonelog.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../services/mocks/MockAuthenticationService';
import { PhonelogService } from '../../../services/phonelog.service';
import { MockPhonelogService } from '../../../services/mocks/MockPhonelogService';
import { TaskService } from '../../../services/task.service';
import { MockTaskService } from '../../../services/mocks/MockTaskService';
import { UserService } from '../../../services/user.service';
import { MockUserService } from '../../../services/mocks/MockUserService';
import { Router } from '@angular/router';

describe('PhonelogTabComponent', () => {
  let component: PhonelogTabComponent;
  let fixture: ComponentFixture<PhonelogTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, MaterialsModule ],
      declarations: [ PhonelogTabComponent, AddPhonelogComponent ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService},
        { provide: PhonelogService, useClass: MockPhonelogService },
        { provide: TaskService, useClass: MockTaskService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl')}},
        { provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: {}}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonelogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
