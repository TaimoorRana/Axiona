import { Component, OnInit } from '@angular/core';
import { TrashService } from '../../services/trash.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-trashbin',
  templateUrl: './trashbin.component.html',
  styleUrls: ['./trashbin.component.css']
})
export class TrashbinComponent implements OnInit {

  items: Object[];

  constructor(public authService: AuthenticationService,
    private translate: TranslateService,
    private trashService: TrashService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadTrashRecords();
  }

  delete(itemModel: String, itemID: String) {
    this.confirmModal(this.translate.instant('TrashBin.Sure')).subscribe(result => {
      if (result) {
        this.trashService.deletePermanently(itemModel, itemID)
          .subscribe(data => {
            this.loadTrashRecords();
          });
      }
    });
  }

  restore(itemModel: String, itemID: String) {
    this.confirmModal(this.translate.instant('TrashBin.Restore')).subscribe(result => {
      if (result) {
        this.trashService.restore(itemModel, itemID)
          .subscribe(data => {
            this.loadTrashRecords();
          });
      }
    });
  }

  loadTrashRecords(): void {
    this.trashService.getAll()
      .subscribe(data => {
        this.items = data;
      });
  }

  confirmModal(message): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: { message: message },
      disableClose: false
    });
    return dialogRef.afterClosed();
  }

}
