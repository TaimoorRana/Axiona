import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonelogTabComponent } from './phonelog-tab.component';

describe('PhonelogTabComponent', () => {
  let component: PhonelogTabComponent;
  let fixture: ComponentFixture<PhonelogTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonelogTabComponent ]
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
