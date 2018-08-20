import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';
import { User } from '../user';

@Component({
  selector: 'fp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;
  model: any = {};

  constructor(private dataService: DataService,
    private router: Router) { }

  ngOnInit() {
  }

  register(registerForm: NgForm): void {
    console.log('register component.register: registerForm: ', registerForm);

    this.dataService.register(registerForm.value).subscribe(
        (data: User) => {
          this.user = data;
          // re-route here?
          this.router.navigate(['login']);
        },
        (err: any) => console.log(err),
        () => { console.log(' completed login. user: ', this.user)}
    );
    console.log('');
  }
}
