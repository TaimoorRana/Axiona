import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ReportPhonelogService } from '../../services/reports-phonelog.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public isPhonelogUrgenciesDataReady = false;
  public phonelogUrgencies;
  public isCallerTypeDataReady = false;
  public phonelogCallerTypes;
  public isCallerPronounsDataReady = false;
  public phonelogCallerPronouns;
  public isCallerNeedsDataReady = false;
  public phonelogCallerNeeds;


  callerUrgencyLabels = ['Yes', 'No'];
  callerTypeLabels = ['Trans person', 'Organization', 'Social worker', 'Other person'];
  callerPronounsLabels = ['Undisclosed', 'She/her', 'They/them', 'He/him'];
  callerNeedsLabels = [
    'Housing',
    'Medical',
    'Legal',
    'Accompaniment',
    'Financial',
    'Name Change',
    'Food Security',
    'Job Finding',
    'Immigration',
    'Victims of Violence',
    'Sexual Health',
    'Information '
  ];
  constructor(private reportPhonelogService: ReportPhonelogService) { }


  ngOnInit() {
    this.fetchCallerUrgencyStatistics();
    this.fetchCallerTypeStatistics();
    this.fetchCallerPronounsStatistics();
    this.fetchCallerNeedsStatistics();
  }

  validateOrReturn0(val) {
    return (val ? val : 0);
  }

  fetchCallerUrgencyStatistics() {
    this.reportPhonelogService.reportUrgent().subscribe(x => {
      this.phonelogUrgencies = x;
      this.isPhonelogUrgenciesDataReady = true;
    });
  }

  generateCallerUrgencyChartData() {
    return [
      {
        data: [
          this.validateOrReturn0(this.phonelogUrgencies['YES']),
          this.validateOrReturn0(this.phonelogUrgencies['NO'])
        ]
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
        data: [
          this.validateOrReturn0(this.phonelogCallerTypes['Trans person']),
          this.validateOrReturn0(this.phonelogCallerTypes['Organization']),
          this.validateOrReturn0(this.phonelogCallerTypes['Social worker']),
          this.validateOrReturn0(this.phonelogCallerTypes['Other person'])
        ]
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
        data: [
          this.validateOrReturn0(this.phonelogCallerPronouns['undisclosed']),
          this.validateOrReturn0(this.phonelogCallerPronouns['she/her']),
          this.validateOrReturn0(this.phonelogCallerPronouns['they/them']),
          this.validateOrReturn0(this.phonelogCallerPronouns['he/him'])
        ]
      }
    ];
  }

  fetchCallerNeedsStatistics() {
    this.reportPhonelogService.reportCallerNeed().subscribe(x => {
      this.phonelogCallerNeeds = x;
      this.isCallerNeedsDataReady = true;
    });
  }

  generateCallerNeedsChartData() {
    return [
      {
        data: [
          this.validateOrReturn0(this.phonelogCallerNeeds['Housing']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Medical']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Legal']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Accompaniment']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Financial']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Name Change']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Food Security']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Job Finding']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Immigration']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Victims of Violence']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Sexual Health']),
          this.validateOrReturn0(this.phonelogCallerNeeds['Information'])]
      }
    ];
  }
}
