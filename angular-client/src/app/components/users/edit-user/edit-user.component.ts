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
  errorMsg = null;
  
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
   }

  ngOnInit() {
  }

  ngOnChanges() {
    this.userForm.patchValue({
      name: this.user.name,
      pronouns: this.user.pronouns,
      email: this.user.email,
      password: '',
      confirmPassword: '',
      role: this.user.role
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      pronouns: [''],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailregex)])],
      password: ['', Validators.pattern(this.passwordregex)],
      confirmPassword: [''],
      role: 'user'
    }, {validator: PasswordValidator.passwordsMatch});
  }

  update() {
    this.userService.update(this.user._id, this.userForm.value)
      .subscribe( (data: any) => {
        if (data.error) {
          this.errorMsg = data.error.msg;
        } else {
          this.cancelEdit();
        }
      });
  }

  delete() {
    this.userService.delete(this.user._id)
      .subscribe(data => {
        this.cancelEdit();
      });
  }

  cancelEdit() {
    this.cancel.emit();
  }

}
