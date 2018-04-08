import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { PasswordValidator } from '../../../validators/password-validator';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: any;
  @Output() cancel = new EventEmitter();
  userForm: FormGroup;
  emailregex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  passwordregex = /^\w{4,12}/;
  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pronouns: [''],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailregex)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(this.passwordregex)])],
      confirmPassword: ['', Validators.required],
      role: 'user'
    }, {validator: PasswordValidator.passwordsMatch});
  }


  cancelEdit() {
    this.cancel.emit();
  }

}
