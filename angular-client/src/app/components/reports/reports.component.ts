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

  fetchCallerUrgencyStatistics() {
    this.reportPhonelogService.reportUrgent().subscribe(x => {
      this.phonelogUrgencies = x;
      this.isPhonelogUrgenciesDataReady = true;
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

  fetchCallerNeedsStatistics() {
    this.reportPhonelogService.reportCallerNeed().subscribe(x => {
      this.phonelogCallerNeeds = x;
      this.isCallerNeedsDataReady = true;
    });
  }

  generateCallerNeedsChartData() {
    return [
      {
        data: [this.phonelogCallerNeeds['Housing'],
          (this.phonelogCallerNeeds['Medical'] ? this.phonelogCallerNeeds['Medical'] : 0),
          (this.phonelogCallerNeeds['Legal'] ? this.phonelogCallerNeeds['Legal'] : 0),
          this.phonelogCallerNeeds['Accompaniment'],
          this.phonelogCallerNeeds['Financial'],
          this.phonelogCallerNeeds['Name Change'],
          this.phonelogCallerNeeds['Food Security'],
          this.phonelogCallerNeeds['Job Finding'],
          this.phonelogCallerNeeds['Immigration'],
          this.phonelogCallerNeeds['Victims of Violence'],
          this.phonelogCallerNeeds['Sexual Health'],
          this.phonelogCallerNeeds['Information']]
      }
    ];
  }
}
