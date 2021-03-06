import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../services/mocks/MockAuthenticationService';
import { PhonelogService } from '../../services/phonelog.service';
import { MockPhonelogService } from '../../services/mocks/MockPhonelogService';
import { PhonelogComponent } from './phonelog.component';
import { AddPhonelogComponent } from './add-phonelog/add-phonelog.component';
import { ViewPhonelogComponent } from './view-phonelog/view-phonelog.component';
import { MaterialsModule } from '../../modules/materials.module';
import { EditPhonelogComponent } from './edit-phonelog/edit-phonelog.component';
import { OrderByPipe } from '../../pipes/orderBy.pipe';
import { SearchPipe } from '../../pipes/search.pipe';



describe('PhonelogComponent', () => {
  let component: PhonelogComponent;
  let fixture: ComponentFixture<PhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonelogComponent, AddPhonelogComponent, ViewPhonelogComponent, EditPhonelogComponent, OrderByPipe, SearchPipe ],
      imports: [ MaterialsModule, RouterTestingModule ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: PhonelogService, useClass: MockPhonelogService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
