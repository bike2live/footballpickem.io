import { TestBed } from '@angular/core/testing';

import { GameResolver } from './game-resolver.service';

describe('GameResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameResolver = TestBed.get(GameResolver);
    expect(service).toBeTruthy();
  });
});
