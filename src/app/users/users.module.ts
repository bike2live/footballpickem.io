import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { CompareValidatorModule } from 'angular-compare-validator';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]),

      // CompareValidatorModule
  ],
  declarations: [
      LoginComponent,
      RegisterComponent,
      ConfirmEqualValidatorDirective
  ]
})
export class UsersModule { }
