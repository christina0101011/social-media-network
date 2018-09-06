import { Component, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  styleUrls: ['./navigation-component.scss'],
  templateUrl: './navigation-component.html'
})

export class NavigationComponent {
  @Output() reloadPage = new EventEmitter();

  reload(blog) {
    this.reloadPage.emit(blog);
  };

  constructor(public auth: AuthenticationService) {}
}


