import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { TokenPayload } from '../Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  credentials: TokenPayload = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  };
  first_name_fields_info: String = '';
  first_name_fields_message: String = 'info';

  last_name_fields_info: String = '';
  last_name_fields_message: String = 'info';

  email_fields_info: String = '';
  email_fields_message: String;

  password_fields_info: String = '';
  message: String;

  fields_message: String;
  fields_info: String;

  validateEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  constructor(private auth: AuthenticationService, private router: Router) {}

  on_change_first_name() {
    if (this.credentials.first_name === '') {
      this.first_name_fields_info = 'error-input';
    } else {
      this.first_name_fields_info = 'success-input'
    }       
  }
  on_change_last_name() {
    if (this.credentials.last_name === '') {
      this.last_name_fields_info = 'error-input';
    } else {
      this.last_name_fields_info = 'success-input'
    }       
  }
  on_change_email() {
    if (this.validateEmail.test(this.credentials.email)) {
      this.email_fields_info = 'success-input';
    } else {
      this.email_fields_info = 'error-input';
    }
  }

  on_change_password() {
    if (this.credentials.password.length < 6) {
      this.password_fields_info = 'error-input';
    } else {
      this.password_fields_info = 'success-input';
    }
  }

  register() {
    if(this.validateEmail.test(this.credentials.email) && this.credentials.first_name && this.credentials.last_name && this.credentials.password) {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
      if (err.status === 500 || 400) { 
        this.fields_message = 'error-message';
        this.password_fields_info = 'error-input';
        this.email_fields_message = 'this email already exists!'
       }
      });
    } else {
    this.fields_message = 'error-message';
    this.password_fields_info = 'error-input';
    this.first_name_fields_info = 'error-input';
    this.last_name_fields_info = 'error-input';
    this.message = 'please fill in all the fields'
    }
  }
}