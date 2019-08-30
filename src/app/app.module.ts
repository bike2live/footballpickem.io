import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faBook, faCalendarAlt, faCheck,
    faCogs, faCubes, faExclamationTriangle, faMinus,
    faThumbsUp, faTrashAlt, faTrophy, faUsersCog, faUserSlash
} from '@fortawesome/free-solid-svg-icons';

import { FeaturesModule } from './features/features.module';
import { UsersModule } from './users/users.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from './core/core.module';
import { EqualValidatorDirective } from './core/equal-validator.directive';
import { ModalModule } from "ngx-bootstrap";
import { AuthorityGuard } from "./authority.guard";
import { AdminModule } from "./admin/admin.module";
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

library.add(faBook, faCheck, faCogs, faCubes, faCalendarAlt, faExclamationTriangle, faMinus,
    faThumbsUp, faTrashAlt, faTrophy, faUsersCog, faUserSlash);

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        PageNotFoundComponent,
        EqualValidatorDirective,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            {path: '', redirectTo: 'schedule', pathMatch: 'full', canActivate: [AuthorityGuard]},
            {path: '**', component: PageNotFoundComponent}
        ]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        FontAwesomeModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        BrowserAnimationsModule,

        CoreModule,
        FeaturesModule,
        UsersModule,
        AdminModule
    ],
    providers: [AuthorityGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
