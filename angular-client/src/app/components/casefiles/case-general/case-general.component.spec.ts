import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseGeneralComponent } from './case-general.component';

describe('CaseGeneralComponent', () => {
  let component: CaseGeneralComponent;
  let fixture: ComponentFixture<CaseGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
