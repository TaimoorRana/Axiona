import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-phonelog-modal',
  templateUrl: './phonelog-modal.component.html',
  styleUrls: ['./phonelog-modal.component.css']
})
export class PhonelogModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PhonelogModalComponent>,
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  isComplete(){
    this.close();
  }

}
