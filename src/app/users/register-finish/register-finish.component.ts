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

    console.log('Register finish... profile: ', profile);
    // check to see if user is already registered

    // save to database, then redirect to home.
    if (profile) {
      this.saveRegistration(profile);
    }
  }

  saveRegistration(profile: any) {

    console.log('saving profile: ', profile);
    let userData = {
      name: profile.name,
      email: profile.email,
      idp_id: profile.sub,
      photo: ''
    };

    if (profile.picture) {
      if (Array.isArray(profile.picture)) {
        userData.photo = profile.picture[0];
      } else {
        userData.photo = profile.picture;
      }
    }

    this.dataService.register(userData).subscribe(
      (data: FbUser) => {
        console.log('successfully saved user');
        this.authService.setUser(data);
        this.router.navigate(['dashboard']);
      },
      (err: any) => {
        console.log('Error registering:', err);

        // go to home even if errored so user an register again.
        this.router.navigate(['dashboard']);
        // this.errMessage = err.error.message;
      }
    );

  }
}
