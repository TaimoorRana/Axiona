import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  navLinks = [
    {
      label: this.translateService.instant('navLinks.Participants'),
      path: './view-participants'
    },
    {
      label: this.translateService.instant('navLinks.AddParticipant'),
      path: './add-participant'
    }
  ];

  constructor(private participantService: ParticipantService, public authService: AuthenticationService, public router: Router,private translateService:TranslateService) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

}
