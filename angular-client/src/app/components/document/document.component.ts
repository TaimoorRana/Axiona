import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';
import { ParticipantService } from '../../services/participant.service';
import { Router } from '@angular/router';
import { Document } from '../../classes/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  document: Document = {
    type: null,
    date: new Date(),
    attachment: null
  };


  constructor(
    private participantService: ParticipantService,
    public dialogRef: MatDialogRef<DocumentComponent>,
    private authService: AuthenticationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private participantID: any
  ) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  /**
   * Submit to save new document to participant
   *
   * @memberof DocumentComponent
   */
  submit() {
    this.participantService.saveDocument(this.document, this.participantID)
      .subscribe(data => {
        this.dialogRef.close();
      });
    console.log(this.document);
  }

  /**
   * Close the document dialog modal
   *
   * @memberof DocumentComponent
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Read file input and store as the attachment
   *
   * @param {any} files 
   * @memberof DocumentComponent
   */
  handleFileInput(files) {
    if (files) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event: Event) => {
        this.document.attachment = reader.result;
      };

    }
  }

}
