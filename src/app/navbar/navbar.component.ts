import { Component } from '@angular/core';
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'fp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = `Byu Football Pick'em 2018`;

  constructor(public authService: AuthService) { }

}
