import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User, Passwords } from '../Models';
import { Router } from '@angular/router';

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

  email_fields_info: String;
  email_fields_message: String = 'info'
  message: String;
  
  fields_info_new_password: String = '';
  fields_info_prev_password: String = '';
  fields_message_prev_password: String = 'info'
  fields_message_new_password: String = 'info'
  message_prev_password: String = '';
  message_new_password: String = '';

  validateEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  constructor(private auth: AuthenticationService, private router: Router) {}

  editDetails() {
    if(this.validateEmail.test(this.details.email) && this.details.first_name && this.details.last_name) {
    this.auth.updateUser(this.details).subscribe(res => {
      this.email_fields_message = 'success-message';
      this.email_fields_info = 'success-input';
      this.message = 'profile updated!'
    }, (err) => {
      console.error(err);
      if (err.status === 500 || 400) { 
        this.email_fields_message = 'error-message';
        this.email_fields_info = 'error-input';
        this.message = 'this email already exists!'
        }
      });
    }
  }

  changePassword() {
    if (this.passwords.new_password.length > 5 && this.passwords.new_password !== this.passwords.prev_password) {
      this.fields_info_new_password = 'success-input';
      
      this.auth.updatePassword(this.passwords).subscribe(res => {
        // console.log(`resp: ${res}`);
        this.fields_info_prev_password = 'success-input';
        this.fields_info_new_password = 'success-input';
        this.fields_message_new_password = 'success-message';
        this.message_new_password = 'password updated!';
        this.message_prev_password = '';
        this.fields_info_prev_password = '';
      }, (err) => {
        console.error(err);
        this.fields_message_prev_password = 'error-message';
        this.message_prev_password = 'incorrect password!';
        this.message_new_password = ''
        this.fields_info_prev_password = 'error-input';
      });
    } else {
      this.fields_info_new_password = 'error-input';
    }
  }

  on_focus_password() {
    if (this.passwords.new_password.length < 5 || this.passwords.new_password === this.passwords.prev_password) {
      this.fields_info_new_password = 'error-input';
    } else {
      this.fields_info_new_password = 'success-input';
    }
  }
  

  deleteAccount(){
    this.auth.deleteAccount(this.details).subscribe(res => {
      this.auth.logout()
      // this.router.navigateByUrl('');
    }, (err) => {
    if (err.status === 500 || 400) { 
      console.log(err)
      }
    });
  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      if (user.deleted) {
        this.router.navigateByUrl('/register');
      } else {
        this.details = user;
      }
    }, (err) => {
      console.error(err);
    });
  }
}
  
