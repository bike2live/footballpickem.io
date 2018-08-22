import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LogResponseInterceptor } from './log-response.service';
import { DataService } from './data.service';
import { CacheInterceptor } from './cache-interceptor';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';

@NgModule({
  imports: [
  ],
  providers: [
    DataService
    // { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],

  declarations: [
    ConfirmEqualValidatorDirective
  ]
})
export class CoreModule { }
