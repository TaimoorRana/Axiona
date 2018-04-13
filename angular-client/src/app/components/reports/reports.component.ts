import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ReportPhonelogService } from '../../services/reports-phonelog.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public urgency;
  public isUrgencyDataReady;
  public callertype;
  public isCallerTypeDataReady;

  urgencyLabels = ['Yes', 'No'];

  callerTypeLabels = ['Trans person', 'Organization', 'Social worker', 'Other person'];


  constructor(private reportPhonelogService: ReportPhonelogService) { }

  fieldTrue(value) {
    return true && value;
  }

  ngOnInit() {
    this.fetchUrgencyStatistics();
    this.fetchCallerTypeStatistics();
  }

  fetchUrgencyStatistics() {
    this.urgency = new Map();
    this.isUrgencyDataReady = [false, false];
    this.reportPhonelogService.reportUrgentYes().subscribe(x => {
      this.urgency.set('urgencyYES', x['count']);
      this.isUrgencyDataReady[0] = true;
    });
    this.reportPhonelogService.reportUrgentNo().subscribe(x => {
      this.urgency.set('urgencyNO', x['count']);
      this.isUrgencyDataReady[1] = true;
    });
  }

  generateUrgencyChartData() {
    return [
      {
        data: [this.urgency.get('urgencyYES'),
          this.urgency.get('urgencyNO')],
        label: 'Urgency',
        labels: ['Yes', 'No']
      },
    ];
  }

  fetchCallerTypeStatistics() {
    this.callertype = new Map();
    this.isCallerTypeDataReady = [false, false, false, false];
    this.reportPhonelogService.reportCallerTypeTrans().subscribe(x => {
      this.callertype.set('callerTypeTRANS', x['count']);
      this.isCallerTypeDataReady[0] = true;
    });
    this.reportPhonelogService.reportCallerTypeOrganization().subscribe(x => {
      this.callertype.set('callerTypeORG', x['count']);
      this.isCallerTypeDataReady[1] = true;
    });
    this.reportPhonelogService.reportCallerTypeSocialWorker().subscribe(x => {
      this.callertype.set('callerTypeSOCW', x['count']);
      this.isCallerTypeDataReady[2] = true;
    });
    this.reportPhonelogService.reportCallerTypeOther().subscribe(x => {
      this.callertype.set('callerTypeOTHER', x['count']);
      this.isCallerTypeDataReady[3] = true;
    });
  }

  generateCallerTypeChartData() {
    return [
      {
        data: [this.callertype.get('callerTypeTRANS'),
          this.callertype.get('callerTypeORG'),
          this.callertype.get('callerTypeSOCW'),
          this.callertype.get('callerTypeOTHER')],
        label: 'Caller Type',
      },
    ];
  }
}
