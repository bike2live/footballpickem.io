import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule } from "@angular/router";
import { AuthorityGuard } from "../../authority.guard";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: 'users', component: UsersComponent, canActivate: [AuthorityGuard]}
        ]),
        FontAwesomeModule
    ],
    declarations: [UsersComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
