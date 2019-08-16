import {Injectable} from '@angular/core';

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

    constructor(private httpClient: HttpClient) {
        const config = environment.security.google_auth;
        config.userStore = new WebStorageStateStore({ store: window.localStorage });
        this.userManager = new UserManager(config);
        this.userManager.getUser().then(user => {
            if (user && !user.expired) {
                this.user = user;
                console.log('user: ', user);
            }
        })
    }

    login(): Promise<any> {
        return this.userManager.signinRedirect();
    }

    logout(): Promise<any> {
        return this.userManager.signoutRedirect();
    }

    // isLoggedIn(): boolean {
    //     return !!this.currentUser && !!this.currentUser.uid;
    // }
    isLoggedIn(): boolean {
        return this.user && this.user.access_token && !this.user.expired;
    }

    getProfile(): any {
        return this.user ? this.user.profile : {};
    }

    getAccessToken(): string {
        return this.user ? this.user.access_token : '';
    }

    signoutRedirectCallback(): Promise<any> {
        return this.userManager.signinRedirectCallback();
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
