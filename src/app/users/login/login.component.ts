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

    }

    ngOnDestroy(): void {
    }

    googleLogin() {
        this.authService.login();
    }

    /**
     * login
     */
/*
    login(loginForm: NgForm) {
        if (loginForm && loginForm.valid) {
            const userName = loginForm.form.value.userName;
            const password = loginForm.form.value.password;

            // console.log('userName: ' + userName);
            // console.log('password: ' + password);

            this.dataService.login(loginForm.form.value).subscribe(
                (data: FbUser) => {
                    console.log('login service returned successfully: user=', data);
                    this.user = new FbUser(data);
                    this.authService.setUser(this.user);
                    this.router.navigate(['dashboard']);
                },
                (err: any) => {
                    console.log(err);
                    this.errorMessage = err.error.message;
                }
            );


            // this.dataService.getBookById(bookID)
            // .subscribe(
            //   (data: Book) => this.selectedBook = data,
            //   (err: any) => console.log(err)
            // );

            // if (this.authService.redirectUrl) {
            //     this.router.navigateByUrl(this.authService.redirectUrl);
            // } else {
            //     this.router.navigate(['/products']);
            // }
        } else {
            this.errorMessage = 'Please enter a user name and password.';
        }
    }
*/
}
