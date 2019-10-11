import { Component, OnInit } from '@angular/core';
import { DataService } from "../core/data.service";
import { AuthService } from "../users/auth.service";
import { Router } from "@angular/router";
import { FbUser } from "../users/fbUser";


@Component({
    selector: 'fp-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    title = `BYU Football Pick'em 2019`;
    user: FbUser;

    constructor(private dataService: DataService,
                public authService: AuthService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
    }


    logout() {
        this.dataService.logout().subscribe(
            () => {
                this.authService.logout().then(() => {
                    this.router.navigate(['login']);
                });
            },
            (err: any) => console.log(err)
        );
    }
}
