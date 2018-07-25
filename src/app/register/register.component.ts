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
  fieldsInfo: String = '';
  fieldsMessage: String = 'info'
  message: String;

  validateEmail: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    if(this.validateEmail.test(this.credentials.email) && this.credentials.first_name && this.credentials.last_name && this.credentials.password) {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
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
    this.message = 'please fill in all the fields'
    }
  }
}