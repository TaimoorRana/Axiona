import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ReportPhonelogService } from '../../services/reports-phonelog.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public urgency;
  public chartData;
  public isDataAvailable;

  chartOptions = {
    responsive: true
  };


  chartLabels = ['Yes', 'No'];

  onChartClick(event) {
    console.log(event);
  }

  constructor(private reportPhonelogService: ReportPhonelogService) { }

  fieldTrue(value) {
    return true && value;
  }

  ngOnInit() {
    this.fetchUrgencyStatistics();
  }

  fetchUrgencyStatistics() {
    this.urgency = new Map();
    this.isDataAvailable = [false, false];
    this.reportPhonelogService.reportUrgentYes().subscribe(x => {
      this.urgency.set('urgencyYES', x['count']);
      this.isDataAvailable[0] = true;
    });
    this.reportPhonelogService.reportUrgentNo().subscribe(x => {
      this.urgency.set('urgencyNO', x['count']);
      this.isDataAvailable[1] = true;
    });
  }

  generateUrgencyChartData() {
    return [
      {
        data: [this.urgency.get('urgencyYES'),
          this.urgency.get('urgencyNO')], label: 'Urgency'
      },
    ];
  }

}
