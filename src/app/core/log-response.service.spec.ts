import { TestBed, inject } from '@angular/core/testing';

import { LogResponseInterceptor } from './log-response.service';

describe('LogResponseInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogResponseInterceptor]
    });
  });

  it('should be created', inject([LogResponseInterceptor], (service: LogResponseInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
