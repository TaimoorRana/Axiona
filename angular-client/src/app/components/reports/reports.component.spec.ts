import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsComponent } from './reports.component';
import { MaterialsModule } from '../../modules/materials.module';
import { ReportPhonelogService } from '../../services/reports-phonelog.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from '../../services/message.service';


describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsComponent ],
      imports: [ MaterialsModule, HttpClientModule ],
      providers: [ReportPhonelogService, MessageService]
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
