import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialsModule } from '../../../modules/materials.module';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../services/mocks/MockAuthenticationService';
import { PhonelogService } from '../../../services/phonelog.service';
import { MockPhonelogService } from '../../../services/mocks/MockPhonelogService';
import { Router } from '@angular/router';
import { SearchPipe } from '../../../pipes/search.pipe';
import { AddPhonelogComponent } from './add-phonelog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MockUserService } from '../../../services/mocks/MockUserService';
import { TaskService } from '../../../services/task.service';
import { MockTaskService } from '../../../services/mocks/MockTaskService';

describe('AddPhonelogComponent', () => {
  let component: AddPhonelogComponent;
  let fixture: ComponentFixture<AddPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPhonelogComponent],
      imports: [MaterialsModule, FormsModule, ReactiveFormsModule],
      providers: [{ provide: AuthenticationService, useClass: MockAuthenticationService },
      { provide: PhonelogService, useClass: MockPhonelogService },
      { provide: UserService, useClass: MockUserService },
      { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
      { provide: TaskService, useClass: MockTaskService },
        MatDialog
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
