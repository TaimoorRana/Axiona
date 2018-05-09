import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseImmigrationComponent } from './case-immigration.component';

describe('CaseImmigrationComponent', () => {
  let component: CaseImmigrationComponent;
  let fixture: ComponentFixture<CaseImmigrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseImmigrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseImmigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
