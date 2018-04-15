import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  navLinks = [
    {
      label: this.translateService.instant('navLinks.Resources'),
      path: './view-resources'
    },
    {
      label: this.translateService.instant('navLinks.AddResource'),
      path: './add-resource'
    }
  ];


  constructor(private resourceService: ResourceService, public authService: AuthenticationService, public router: Router,private translateService:TranslateService) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

}
