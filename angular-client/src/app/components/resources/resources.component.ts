import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  navLinks = [
    {
      label: 'Resources',
      path: './view-resources'
    },
    {
      label: 'Add Resource',
      path: './add-resource'
    }
  ];


  constructor(private resourceService: ResourceService, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

}
