import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantIntakeComponent } from './add-participant-intake.component';

describe('AddParticipantIntakeComponent', () => {
  let component: AddParticipantIntakeComponent;
  let fixture: ComponentFixture<AddParticipantIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParticipantIntakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParticipantIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
