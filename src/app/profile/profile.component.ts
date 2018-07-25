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
  passwords: Passwords = new Passwords();
  fieldsInfo: String = '';
  fieldsMessage: String = 'info'
  message: String;
  fieldsInfoPassword: String = '';
  fieldsMessagePassword: String = 'info'
  messagePassword: String;
  validateEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  constructor(private auth: AuthenticationService) {}

  editDetails() {
    if(this.validateEmail.test(this.details.email) && this.details.first_name && this.details.last_name) {
    this.auth.update(this.details).subscribe(res => {
      this.fieldsMessage = 'success-message';
      this.fieldsInfo = 'success-input';
      this.message = 'profile updated!'
    }, (err) => {
      console.error(err);
      if (err.status === 500 || 400) { 
        this.fieldsMessage = 'error-message';
        this.fieldsInfo = 'error-input';
        this.message = 'this email already exists!'
       }
    });
    } else {
      this.fieldsMessage = 'error-message';
      this.fieldsInfo = 'error-input';
      this.message = 'incorrect data!'
    }
  }

  changePassword() {
    if (this.passwords.new_password !== this.passwords.prev_password && this.passwords.new_password.length > 5) {
      this.auth.updatePassword(this.passwords).subscribe(res => {
        // console.log(`resp: ${res}`);
        this.fieldsMessagePassword = 'success-message';
        this.messagePassword = 'password updated!'
        this.fieldsInfoPassword = 'success-input';
      }, (err) => {
        console.error(err);
        this.fieldsMessagePassword = 'error-message';
        this.messagePassword = 'incorrect password!'
        this.fieldsInfoPassword = 'error-input';
      });
    } else {
      this.fieldsMessagePassword = 'error-message';
      this.fieldsInfoPassword = 'error-input';
      this.messagePassword = 'password has to be different from previous and min length 6 characters'
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
