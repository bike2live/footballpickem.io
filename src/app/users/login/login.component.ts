import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { FbUser } from '../fbUser';
import { AuthService } from '../auth.service';

@Component({
    selector: 'fp-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    errorMessage: string;
    user: FbUser;

    constructor(private dataService: DataService,
                private authService: AuthService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            const error = params['error'];
            if (error) {
                this.errorMessage = error;
                // remove the error from the history and the url in the browser
                window.history.replaceState({},
                  window.document.title,
                  window.location.origin);
            }
        });
        let authUser$ = this.authService.getGoogleUser(false);
        authUser$.subscribe((googleUser) => {
            if (this.authService.isLoggedIn()) {
                this.authService.isGoogleUserRegistered(googleUser.profile.sub).subscribe((uid) => {
                    console.log('isGoogleUserRegistered returned: ', uid);
                    if (!uid || uid === '') {
                        this.authService.removeUser();
                    } else {
                        this.authService.dbLogin(googleUser.profile.sub);
                    }
                });
                this.router.navigate(['dashboard']);
            }
        });
    }

    ngOnDestroy(): void {
    }

    googleLogin() {
        this.authService.login();
    }
}
