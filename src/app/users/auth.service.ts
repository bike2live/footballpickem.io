import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../core/data.service';
import { UserScore } from '../features/schedule/add-score-modal/userScore';

import {FbUser} from './fbUser';
import { UserManager, User, WebStorageStateStore } from 'oidc-client';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userManager: UserManager;
    private user: User;
    currentUser: FbUser;

    constructor(private httpClient: HttpClient,
                private router: Router,
                private dataService: DataService) {
        const config = {...environment.security.google_auth, userStore: null};
        config.userStore = new WebStorageStateStore({ store: window.localStorage });
        this.userManager = new UserManager(config);
        this.userManager.getUser().then(user => {
            if (user && !user.expired) {
                this.user = user;
                console.log('user: ', user);
                this.validateUser(user.profile.sub).subscribe( (fbUser) => {
                    console.log('validateUser returned: ', fbUser);
                    if (fbUser && fbUser.idp_id) {
                        this.currentUser = new FbUser(fbUser);
                        this.router.navigate(['dashboard']);
                    } else {
                        this.user = null;
                        this.userManager.removeUser().then(() => {
                            this.router.navigate([`login`]);
                        });
                    }
                });
            } else {
                this.router.navigate(['login']);
            }
        });

        this.currentUser = new FbUser({name: 'Jack'});
    }

    login(): Promise<any> {
        return this.userManager.signinRedirect();
    }

    register(): Promise<any> {
        const config = environment.security.google_auth;
        config.redirect_uri = config.redirect_uri.replace('login', 'register');
        this.userManager = new UserManager(config);
        return this.userManager.signinRedirect();
    }

    validateUser(idp_id): Observable<FbUser> {
        let result = null;

        return this.dataService.login(idp_id)
          .pipe(
            map( response => <FbUser> response )
          );
    }

    logout(): Promise<any> {
        this.user = null;
        this.currentUser = null;
        return this.userManager.signoutRedirect();
    }

    isLoggedIn(): boolean {
        return this.user && this.user.access_token && !this.user.expired;
    }

    getAuthUser(): User {
        return this.user;
    }

    getProfile(): any {
        return this.user ? this.user.profile : {};
    }

    getAccessToken(): string {
        return this.user ? this.user.access_token : '';
    }

    signoutRedirectCallback(): Promise<any> {
        return this.userManager.signoutRedirectCallback();
    }

    isAdmin(): boolean {
        return !!this.currentUser && this.currentUser.isAdmin;
    }

    setUser(user: FbUser): void {
        this.currentUser = user;
    }

    getUser(): FbUser {
        return this.currentUser;
    }

}
