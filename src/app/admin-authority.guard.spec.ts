import { TestBed, async, inject } from '@angular/core/testing';

import { AdminAuthorityGuard } from './admin-authority.guard';

describe('AdminAuthorityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthorityGuard]
    });
  });

  it('should ...', inject([AdminAuthorityGuard], (guard: AdminAuthorityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
