import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AdminAuthorityGuard } from '../admin-authority.guard';
import { UsersComponent } from './users/users.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: 'users', component: UsersComponent, canActivate: [AdminAuthorityGuard]},
            {path: 'settings', component: AppSettingsComponent, canActivate: [AdminAuthorityGuard]}
        ]),
        FontAwesomeModule
    ],
    declarations: [UsersComponent, AppSettingsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {
}
