import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ReportPhonelogService } from '../../services/reports-phonelog.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public isPhonelogUrgenciesReady = false;
  public phonelogUrgencies;
  public callerType = new Map();
  public isCallerTypeDataReady = [false, false, false, false];
  public callerPronouns = new Map();
  public isCallerPronounsDataReady = [false, false, false, false];

  callerUrgencyLabels = ['Yes', 'No'];
  callerTypeLabels = ['Trans person', 'Organization', 'Social worker', 'Other person'];
  callerPronounsLabels = ['undisclosed', 'she/her', 'they/them', 'he/him'];


  constructor(private reportPhonelogService: ReportPhonelogService) { }

  fieldTrue(value) {
    return true && value;
  }

  ngOnInit() {
    this.fetchCallerUrgencyStatistics();
    this.fetchCallerTypeStatistics();
    this.fetchCallerPronounsStatistics();
  }

  fetchCallerUrgencyStatistics() {
    this.reportPhonelogService.reportUrgent().subscribe(x => {
      this.phonelogUrgencies = x;
      this.isPhonelogUrgenciesReady = true;
    });
  }

  generateCallerUrgencyChartData() {
    return [
      {
        data: [this.phonelogUrgencies['YES'],
          this.phonelogUrgencies['NO']]
      },
    ];
  }

  fetchCallerTypeStatistics() {
    this.reportPhonelogService.reportCallerTypeTrans().subscribe(x => {
      this.callerType.set('callerTypeTRANS', x['count']);
      this.isCallerTypeDataReady[0] = true;
    });
    this.reportPhonelogService.reportCallerTypeOrganization().subscribe(x => {
      this.callerType.set('callerTypeORG', x['count']);
      this.isCallerTypeDataReady[1] = true;
    });
    this.reportPhonelogService.reportCallerTypeSocialWorker().subscribe(x => {
      this.callerType.set('callerTypeSOCW', x['count']);
      this.isCallerTypeDataReady[2] = true;
    });
    this.reportPhonelogService.reportCallerTypeOther().subscribe(x => {
      this.callerType.set('callerTypeOTHER', x['count']);
      this.isCallerTypeDataReady[3] = true;
    });
  }

  generateCallerTypeChartData() {
    return [
      {
        data: [this.callerType.get('callerTypeTRANS'),
          this.callerType.get('callerTypeORG'),
          this.callerType.get('callerTypeSOCW'),
          this.callerType.get('callerTypeOTHER')]
      },
    ];
  }

  fetchCallerPronounsStatistics() {
    this.reportPhonelogService.reportCallerPronounUND().subscribe(x => {
      this.callerPronouns.set('callerPronounUND', x['count']);
      this.isCallerPronounsDataReady[0] = true;
    });
    this.reportPhonelogService.reportCallerPronounSHE().subscribe(x => {
      this.callerPronouns.set('callerPronounSHE', x['count']);
      this.isCallerPronounsDataReady[1] = true;
    });
    this.reportPhonelogService.reportCallerPronounTHEY().subscribe(x => {
      this.callerPronouns.set('callerPronounTHEY', x['count']);
      this.isCallerPronounsDataReady[2] = true;
    });
    this.reportPhonelogService.reportCallerPronounHIM().subscribe(x => {
      this.callerPronouns.set('callerPronounHIM', x['count']);
      this.isCallerPronounsDataReady[3] = true;
    });
  }

  generateCallerPronounsChartData() {
    return [
      {
        data: [this.callerPronouns.get('callerPronounUND'),
          this.callerPronouns.get('callerPronounSHE'),
          this.callerPronouns.get('callerPronounTHEY'),
          this.callerPronouns.get('callerPronounHIM')]
      },
    ];
  }
}
