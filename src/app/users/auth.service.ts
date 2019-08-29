import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of } from 'rxjs';
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
    private initialized: boolean = false;
    currentUser: FbUser;

    constructor(private httpClient: HttpClient,
                private router: Router,
                private dataService: DataService) {
        this.initialized = false;
        this.currentUser = new FbUser({});
    }

    initialize(register: boolean) {
        const config = {...environment.security.google_auth, userStore: null};
        if (register) {
            config.redirect_uri = config.redirect_uri.replace('login', 'register');
        }
        config.userStore = new WebStorageStateStore({ store: window.localStorage });
        this.userManager = new UserManager(config);
        this.initialized = true;
    }

    /**
     * Verify that the user has registered.
     */
    getGoogleUser(register: boolean): Observable<any> {
        if (!this.initialized) {
            this.initialize(register);
        }

        let user$ = from(this.userManager.getUser());
        user$.subscribe((user) => {
            console.log('authUser, userManager returned user: ', user);

            if (user && !user.expired) {
                this.user = user;
                console.log('user: ', user);
            }
        });
        return user$;
    }

    login(): Promise<any> {
        return this.userManager.signinRedirect();
    }

    register(): Promise<any> {
        this.initialize(true);
        return this.userManager.signinRedirect();
    }

    isGoogleUserRegistered(idp_id): Observable<string> {
        let result = null;
        console.log('logging in to see if the user is in the system.');
        return this.dataService.isUserRegistered(idp_id)
          .pipe(
            map( response => <string> response )
          );
    }

    logout(): Promise<any> {
        this.user = null;
        this.currentUser = new FbUser({});
        return this.userManager.signoutRedirect();
    }

    removeUser() {
        this.user = null;
        this.userManager.removeUser().then(() => {
            this.router.navigate([`login`]);
        });
    }

    isLoggedIn(): boolean {
        return this.user && this.user.access_token && !this.user.expired;
    }

    getAuthUser(): User {
        return this.user;
    }

    addUserRegistration(): Observable<User> {
        console.log('auth service addUserRegistration, !user, authorizing user');
        let googleUser$ = this.getGoogleUser(true);

        googleUser$.subscribe((googleUser) => {
            console.log('authService addUserRegistration: getGoogleUser returned, googleUser: ', googleUser);
            if (googleUser) {
                console.log('got the googleUser, now to check to see if he is in the db...');
                this.isGoogleUserRegistered(googleUser.profile.sub).subscribe((uid) => {
                    console.log('isGoogleUserRegistered returned: ', uid);
                    if (!uid || uid === '') {
                        this.insertRegistration(googleUser).subscribe((fbUser) => {
                            this.user = googleUser; // todo: this might be redundent
                            this.currentUser = new FbUser({...fbUser});
                            this.router.navigate(['dashboard']);
                        });
                    } else {
                        // then user is registered,
                        // this.dataService.login(this.user.profile.sub).subscribe((fbUser) => {
                        //     this.currentUser = new FbUser({...fbUser});
                        //     this.router.navigate(['dashboard']);
                        // })
                        this.dbLogin(this.user.profile.sub);
                    }
                });

            }
        });

        return of(this.user);
    }

    dbLogin(userId: string) {
        this.dataService.login(userId).subscribe((fbUser) => {
            this.currentUser = new FbUser({...fbUser});
            this.router.navigate(['dashboard']);
        })
    }

    insertRegistration(googleUser: any): Observable<FbUser> {
        return this.dataService.register(googleUser.profile);
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
        this.currentUser = new FbUser({...user});
    }

    getUser(): FbUser {
        return this.currentUser;
    }

}
