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
  public isCallerTypeDataReady = false;
  public phonelogCallerTypes;
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
    this.reportPhonelogService.reportCallerType().subscribe(x => {
      this.phonelogCallerTypes = x;
      this.isCallerTypeDataReady = true;
    });
  }

  generateCallerTypeChartData() {
    return [
      {
        data: [this.phonelogCallerTypes['Trans person'],
          this.phonelogCallerTypes['Organization'],
          this.phonelogCallerTypes['Social worker'],
          this.phonelogCallerTypes['Other person']]
      }
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
