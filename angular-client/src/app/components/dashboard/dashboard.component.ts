import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardLinks = [
    {label: this.translate.instant('dashboardLinks.Dashboard'), icon: 'home', path: 'activity'},
    {label: this.translate.instant('dashboardLinks.Tasks'), icon: 'assignment', path: 'tasks'},
    {label: this.translate.instant('dashboardLinks.Active'), icon: 'folder', path: 'active-casefiles'},
    {label: this.translate.instant('dashboardLinks.Phone'), icon: 'phone', path: 'phonelog'},
    {label: this.translate.instant('dashboardLinks.Manage'), icon: 'supervisor_account', path: 'users'},
    {label: this.translate.instant('dashboardLinks.Reports'), icon: 'assessment', path: 'reports'},
    {label: this.translate.instant('dashboardLinks.Bin'), icon: 'delete', path: 'trashbin'}
  ];

  constructor(private authenticationService: AuthenticationService, private translate: TranslateService) {
   }

  ngOnInit() {
  }

}
