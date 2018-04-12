import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-phonelog-tab',
  templateUrl: './phonelog-tab.component.html',
  styleUrls: ['./phonelog-tab.component.css']
})
export class PhonelogTabComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  viewPhonelog() {
    this.router.navigateByUrl('/dashboard/phonelog');
  }

}
