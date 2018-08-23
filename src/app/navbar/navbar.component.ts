import { Component } from '@angular/core';
import {DataService} from "../core/data.service";
import {AuthService} from "../users/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = `Byu Football Pick'em 2018`;

  constructor(private dataService: DataService,
              public authService: AuthService,
              private router: Router) { }

    logout() {
        this.dataService.logout().subscribe(
            () => {
              this.authService.setUser(undefined);
              this.router.navigate(['login']);
            },
            (err: any) => console.log(err)
        );
    }
}
