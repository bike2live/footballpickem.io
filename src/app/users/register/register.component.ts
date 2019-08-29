import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { FbUser } from '../fbUser';
import { AuthService } from '../auth.service';

@Component({
  selector: 'fp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: FbUser;
  // model: any = {};
  errMessage: String;
  redirect_uri: 'https://localhost:4200/assets/oidc-login-redirect.html';

  constructor(private dataService: DataService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  googleRegister() {
    this.authService.register();
  }

/*
  register(registerForm: NgForm): void {
    this.errMessage = undefined;
    this.dataService.register(registerForm.value).subscribe(
        (data: FbUser) => {
          this.user = data;
          this.authService.setUser(this.user);
          this.router.navigate(['dashboard']);
        },
        (err: any) => {
          console.log('Error registering:', err);
          this.errMessage = err.error.message;
        }
    );
    console.log('');
  }
*/
}
