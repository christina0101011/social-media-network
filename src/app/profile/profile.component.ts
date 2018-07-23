import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../Models';
// import { userInfo } from 'os';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  details: User = new User();

  constructor(private auth: AuthenticationService) {}

  editDetails() {
    this.auth.update(this.details).subscribe(res => {
      console.log(`resp: ${res}`);
    }, (err) => {
      console.error(err);
    });
  }
  
  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
}
