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
  first_nameFieldsInfo: String = '';
  first_nameFieldsMessage: String = 'info';

  last_nameFieldsInfo: String = '';
  last_nameFieldsMessage: String = 'info';

  fieldsInfoEmail: String = '';
  emailFieldsMessage: String;

  passwordFieldsInfo: String = '';
  message: String;

  fieldsMessage: String;
  fieldsInfo: String;

  validateEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  constructor(private auth: AuthenticationService, private router: Router) {}

  on_change_first_name() {
    if (this.credentials.first_name === '') {
      this.first_nameFieldsInfo = 'error-input';
    } else {
      this.first_nameFieldsInfo = 'success-input'
    }       
  }
  on_change_last_name() {
    if (this.credentials.last_name === '') {
      this.last_nameFieldsInfo = 'error-input';
    } else {
      this.last_nameFieldsInfo = 'success-input'
    }       
  }
  on_change_email() {
    if (this.validateEmail.test(this.credentials.email)) {
      this.fieldsInfoEmail = 'success-input';
    } else {
      this.fieldsInfoEmail = 'error-input';
    }
  }

  on_change_password() {
    if (this.credentials.password.length < 6) {
      this.passwordFieldsInfo = 'error-input';
    } else {
      this.passwordFieldsInfo = 'success-input';
    }
  }

  register() {
    if(this.validateEmail.test(this.credentials.email) && this.credentials.first_name && this.credentials.last_name && this.credentials.password) {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
      if (err.status === 500 || 400) { 
        this.fieldsMessage = 'error-message';
        this.passwordFieldsInfo = 'error-input';
        this.emailFieldsMessage = 'this email already exists!'
       }
      });
    } else {
    this.fieldsMessage = 'error-message';
    this.passwordFieldsInfo = 'error-input';
    this.first_nameFieldsInfo = 'error-input';
    this.last_nameFieldsInfo = 'error-input';
    this.message = 'please fill in all the fields'
    }
  }
}