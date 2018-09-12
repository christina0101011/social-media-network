import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { TokenPayload } from '../Models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  };
  fieldsInfo: String = '';
  fieldsMessage: String = 'info'
  message: String;

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/blogs');
    }, (err) => {
      console.error(err);
      this.fieldsMessage = 'error-message';
      this.fieldsInfo = 'error-input';
      this.message = 'wrong email or password'
    }); 
  }
}
