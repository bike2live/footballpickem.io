import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorityGuard } from './authority.guard';

describe('AuthorityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorityGuard]
    });
  });

  it('should ...', inject([AuthorityGuard], (guard: AuthorityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
