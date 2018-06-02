import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportsComponent } from './reports.component';
import { MaterialsModule } from '../../modules/materials.module';
import { ReportPhonelogService } from '../../services/reports-phonelog.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../../services/message.service';
import { PhonelogService } from '../../services/phonelog.service';
import { MockPhonelogService } from '../../services/mocks/MockPhonelogService';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../services/mocks/MockAuthenticationService';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';


describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ MaterialsModule, HttpClientModule ],
      providers: [ReportPhonelogService, MessageService,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: PhonelogService, useClass: MockPhonelogService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl')}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
