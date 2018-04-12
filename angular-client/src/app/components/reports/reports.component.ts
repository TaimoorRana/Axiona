import { Component, OnInit } from '@angular/core';
import { ReportPhonelogService } from '../../services/reports-phonelog.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  public urgency;

  constructor(private reportPhonelogService: ReportPhonelogService) { }

  ngOnInit() {
    this.generateUrgentReport();
  }

  generateUrgentReport() {
    this.urgency = new Map();
    this.reportPhonelogService.reportUrgent().subscribe(x => {
      this.urgency.set('urgencyYES', x['count']);
      console.log(this.urgency.get('urgencyYES'));
    });
  }
}
