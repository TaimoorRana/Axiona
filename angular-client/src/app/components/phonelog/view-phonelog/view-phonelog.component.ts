import { Component, OnInit, Input, Inject, Pipe, PipeTransform, OnChanges } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';
import { UserService } from '../../../services/user.service';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-view-phonelog',
  templateUrl: './view-phonelog.component.html',
  styleUrls: ['./view-phonelog.component.css'],

})

export class ViewPhonelogComponent implements OnInit, OnChanges {

  @Input() reloadPhonelogs: boolean;
  editingLog = Phonelog;
  public logs;
  public history;
  public sortProperty = 'urgent';
  public reverse = false;
  public query: string;
  public namesSocialWorkers;

  constructor(
    private phonelogService: PhonelogService,
    private userService: UserService,
    public authService: AuthenticationService,
    public router: Router) {
      this.phonelogService.phoneLogged.subscribe(_ => {
        this.loadLogs();
      });
    }


  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    } else {
      this.loadLogs();
      this.loadHistory();
      this.loadNames();
    }
  }

  ngOnChanges() {
    if (this.reloadPhonelogs) {
      this.loadLogs();
      this.loadHistory();
    }
  }

  /**
   * Load all active phonelogs
   *
   * @memberof ViewPhonelogComponent
   */
  loadLogs() {
    this.phonelogService.getActive()
      .subscribe(data => {
        this.logs = data;
      });
  }

  /**
   * Load names of social workers
   *
   * @memberof ViewPhonelogComponent
   */
  loadNames() {
    this.userService.getAllNames()
      .subscribe(data => {
        this.namesSocialWorkers = data;
      });
  }

  /**
   * Looks up the name of the socialworker
   * from a user ID
   *
   * @memberof ViewPhonelogComponent
   */
  getName(id) {
    return this.namesSocialWorkers.filter(sw => sw._id == id)[0]["name"];
  }

  /**
   * Load all resovled phonelogs
   *
   * @memberof ViewPhonelogComponent
   */
  loadHistory() {
    this.phonelogService.getByResolved()
      .subscribe(data => {
        this.history = data;
      });
  }

  /**
   * Specify which log is currently in edit mode
   *
   * @param {any} log
   * @memberof ViewPhonelogComponent
   */
  edit(log) {
    this.editingLog = log;
  }

  /**
   * Set phonelog item to resolved
   *
   * @param {any} log
   * @memberof ViewPhonelogComponent
   */
  resolve(log) {
    this.phonelogService.resolve(log._id, { resolved: 'true' }).subscribe(data => {
      this.logs = [];
      this.loadLogs();
      this.loadHistory();
    });
  }

  /**
   * Put phonelog item to the trashbin.
   *
   * @param {any} log
   * @memberof ViewPhonelogComponent
   */
  delete(log) {
    this.phonelogService.delete(log._id, { deleted: 'true' }).subscribe(data => {
      this.logs = [];
      this.loadLogs();
      this.loadHistory();
    });
  }

  /**
  * Cancel edit mode and return to view mode
  *
  * @memberof ViewPhonelogComponent
  */
  cancel() {
    this.edit(null);
    this.logs = [];
    this.loadLogs();
    this.loadHistory();
  }
}
