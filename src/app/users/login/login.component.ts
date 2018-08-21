import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { User } from '../user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'fp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  user: User;

  constructor(private dataService: DataService,
      private authService: AuthService,
      private router: Router) {}

  ngOnInit() {}

  /**
   * login
   */
  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;

      console.log('userName: ' + userName);
      console.log('password: ' + password);

      this.dataService.login(loginForm.form.value).subscribe(
        (data: User) => {
          this.user = data;
          this.authService.setUser(this.user);
          this.router.navigate(['dashboard']);
        },
        (err: any) => {
          console.log(err);
          this.errorMessage = err.error.message;
        },
        () => { console.log(' completed login. user: ', this.user); }
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
}
