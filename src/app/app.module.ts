import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FeaturesModule } from './features/features.module';
import { UsersModule } from './users/users.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoreModule } from './core/core.module';
import { EqualValidatorDirective } from './core/equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    EqualValidatorDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'schedule', pathMatch: 'full'},
      { path: '**', component: PageNotFoundComponent }
    ]),
    HttpClientModule,
    FormsModule,

    CoreModule,
    FeaturesModule,
    UsersModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
