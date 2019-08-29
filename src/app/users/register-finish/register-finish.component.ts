import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../../core/data.service';
import { AuthService } from '../auth.service';
import { FbUser } from '../fbUser';

@Component({
  selector: 'fp-register-finish',
  templateUrl: './register-finish.component.html',
  styleUrls: ['./register-finish.component.scss']
})
export class RegisterFinishComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.addUserRegistration();
  }

}
