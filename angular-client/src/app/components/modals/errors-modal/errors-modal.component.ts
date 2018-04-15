import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-errors-modal',
  templateUrl: './errors-modal.component.html',
  styleUrls: ['./errors-modal.component.css']
})
export class ErrorsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorsModalComponent>,
    public messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }

  ok(): void {
    this.dialogRef.close();
  }

}
