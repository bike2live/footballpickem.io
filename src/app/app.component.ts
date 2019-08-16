import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './users/auth.service';

@Component({
  selector: 'fp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (window.location.href.indexOf('?postLogout=true') > 0) {
      this.authService.signoutRedirectCallback().then( () => {
        const url: string = this.router.url.substring(0, this.router.url.indexOf('?') );
        this.router.navigateByUrl(url);
      });
    }
  }

}
