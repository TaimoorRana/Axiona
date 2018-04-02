import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonelogModalComponent } from './phonelog-modal.component';

describe('PhonelogModalComponent', () => {
  let component: PhonelogModalComponent;
  let fixture: ComponentFixture<PhonelogModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonelogModalComponent ]
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
