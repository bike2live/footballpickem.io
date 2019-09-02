import { TestBed } from '@angular/core/testing';

import { GameResultsResolver } from './game-results-resolver.service';

describe('GameResultsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameResultsResolver = TestBed.get(GameResultsResolver);
    expect(service).toBeTruthy();
  });
});
