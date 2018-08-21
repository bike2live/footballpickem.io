import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'fp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  // model: any = {};
  errMessage: String;

  constructor(private dataService: DataService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  register(registerForm: NgForm): void {
    this.errMessage = undefined;
    this.dataService.register(registerForm.value).subscribe(
        (data: User) => {
          this.user = data;
          this.authService.setUser(this.user);
          this.router.navigate(['dashboard']);
        },
        (err: any) => {
          console.log('Error registering:', err);
          this.errMessage = err.error.message;
        },
        () => { console.log(' completed login. user: ', this.user); }
    );
    console.log('');
  }
}
