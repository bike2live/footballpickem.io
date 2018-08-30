import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from "@angular/router/testing";
import { Component, Directive, Input } from "@angular/core";
import { DataService } from "../core/data.service";
import { AuthService } from "../users/auth.service";
import { Router } from "@angular/router";

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let mockDataService;
    let mockAuthService;
    let mockRouter;

    @Component({ selector: 'fa-icon', template: '<div></div>' })
    class FakeFaIcon {
        @Input() icon: any;
    }

    @Directive({
        selector: '[routerLink]',
        host: { '(click)': 'onClick()' }
    })
    class RouterLinkDirectiveStub {
        @Input('routerLink') linkParams: any;
        navigatedTo: any = null;

        onClick() {
            this.navigatedTo = this.linkParams;
        }
    }

    beforeEach(async(() => {
        mockDataService = jasmine.createSpyObj(['logout']);
        mockAuthService = jasmine.createSpyObj(['getUser', 'setUser', 'isLoggedIn']);
        mockRouter = jasmine.createSpyObj(['navigate']);

        TestBed.configureTestingModule({
            // imports: [RouterTestingModule],
            declarations: [
                NavbarComponent,
                FakeFaIcon,
                RouterLinkDirectiveStub
            ],
            providers: [
                { provide: DataService, useValue: mockDataService },
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        let admin = { name: 'Jack Jack', uid: '1', username: 'icecream', roles: ['ADMIN'] };
        mockAuthService.getUser.and.returnValue(admin);
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
