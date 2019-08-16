import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { AuthService } from '../auth.service';
import { FbUser } from '../fbUser';

@Component({
  selector: 'fp-register-finish',
  templateUrl: './register-finish.component.html',
  styleUrls: ['./register-finish.component.scss']
})
export class RegisterFinishComponent implements OnInit {

  constructor(private authService: AuthService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    let profile = this.authService.getProfile();

    // check to see if user is already registered

    // save to database, then redirect to home.
    if (profile) {
      this.saveRegistration(profile);
    }
  }

  saveRegistration(profile: any) {

    let userData = {
      name: profile.name,
      username: profile.email,
      password: null,
      confirm: null
    };

    this.dataService.register(userData).subscribe(
      (data: FbUser) => {
        this.authService.setUser(data);
        this.router.navigate(['']);
      },
      (err: any) => {
        console.log('Error registering:', err);

        // go to home even if errored so user an register again.
        this.router.navigate(['']);
        // this.errMessage = err.error.message;
      }
    );

  }
}
