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
  public isCallerPronounsDataReady = false;
  public phonelogCallerPronouns;

  callerUrgencyLabels = ['Yes', 'No'];
  callerTypeLabels = ['Trans person', 'Organization', 'Social worker', 'Other person'];
  callerPronounsLabels = ['Undisclosed', 'She/her', 'They/them', 'He/him'];

  constructor(private reportPhonelogService: ReportPhonelogService) { }


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
    this.reportPhonelogService.reportCallerPronoun().subscribe(x => {
      this.phonelogCallerPronouns = x;
      this.isCallerPronounsDataReady = true;
    });
  }

  generateCallerPronounsChartData() {
    return [
      {
        data: [this.phonelogCallerPronouns['undisclosed'],
          this.phonelogCallerPronouns['she/her'],
          this.phonelogCallerPronouns['they/them'],
          this.phonelogCallerPronouns['he/him']]
      }
    ];
  }
}
