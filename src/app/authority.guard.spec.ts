import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';

import { AuthorityGuard } from './authority.guard';
import { AuthService } from "./users/auth.service";
import { Router } from "@angular/router";

describe('AuthorityGuard', () => {

    let mockAuthService;
    let mockRouter;

    beforeEach(() => {
        mockAuthService = jasmine.createSpyObj(['isLoggedIn']);
        mockRouter = jasmine.createSpyObj(['navigate']);

        TestBed.configureTestingModule({
            providers: [
                AuthorityGuard,
                {provide: AuthService, useValue: mockAuthService},
                {provide: Router, useValue: mockRouter},
            ]
        });
    });

    it('should ...', inject([AuthorityGuard], (guard: AuthorityGuard) => {
        expect(guard).toBeTruthy();
    }));
});
