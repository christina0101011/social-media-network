import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User, Passwords } from '../Models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  details: User = new User();
  passwords: Passwords = {
    new_password: '',
    prev_password: ''
  };

  fieldsInfoEmail: String;
  fieldsMessageEmail: String = 'info'
  message: String;
  
  fieldsInfoNew_password: String = '';
  fieldsInfoPrev_password: String = '';
  fieldsMessagePrev_password: String = 'info'
  fieldsMessageNew_password: String = 'info'
  messagePrev_password: String = '';
  messageNew_password: String = '';

  validateEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  constructor(private auth: AuthenticationService) {}

  editDetails() {
    if(this.validateEmail.test(this.details.email) && this.details.first_name && this.details.last_name) {
    this.auth.update(this.details).subscribe(res => {
      this.fieldsMessageEmail = 'success-message';
      this.fieldsInfoEmail = 'success-input';
      this.message = 'profile updated!'
    }, (err) => {
      console.error(err);
      if (err.status === 500 || 400) { 
        this.fieldsMessageEmail = 'error-message';
        this.fieldsInfoEmail = 'error-input';
        this.message = 'this email already exists!'
        }
      });
    }
  }

  changePassword() {
    if (this.passwords.new_password !== this.passwords.prev_password && this.passwords.new_password.length > 6) {
      this.auth.updatePassword(this.passwords).subscribe(res => {
        // console.log(`resp: ${res}`);
        this.fieldsMessageNew_password = 'success-message';
        this.messageNew_password = 'password updated!';
        this.messagePrev_password = '';
        this.fieldsInfoPrev_password = '';
      }, (err) => {
        console.error(err);
        this.fieldsMessagePrev_password = 'error-message';
        this.messagePrev_password = 'incorrect password!';
        this.messageNew_password = ''
        this.fieldsInfoPrev_password = 'error-input';
      });
    }
  }

  focusFunction() {
    if (this.passwords.new_password === this.passwords.prev_password || this.passwords.new_password.length < 6) {
      this.fieldsInfoNew_password = 'error-input';
    } else {
      this.fieldsInfoNew_password = 'success-message';
    }
  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
}
  
