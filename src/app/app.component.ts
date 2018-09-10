import { Component } from '@angular/core';
import { BlogsService } from './blogs.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  constructor (  private _blogsService: BlogsService, private router: Router, public auth: AuthenticationService ){}

  ngOnInit() {
    if (this.auth.isLoggedIn()){
      this._blogsService.getBlogs().subscribe((res:Array<object>) => {
        if(res.length > 0) {
          this.router.navigate(['/blogs']);
        } else {
          this.router.navigate(['/initial']);
        }
      });
    } 
    else {
      this.router.navigate(['/register']);
    }
  }
}
