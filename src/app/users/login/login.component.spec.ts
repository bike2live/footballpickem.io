import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from "@angular/forms";
import { DataService } from "../../core/data.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { Directive, Input } from "@angular/core";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let mockDataService;
    let mockAuthService;
    let mockRouter;

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
        mockDataService = jasmine.createSpyObj(['register']);
        mockAuthService = jasmine.createSpyObj(['getUser', 'setUser', 'isLoggedIn']);
        mockRouter = jasmine.createSpyObj(['navigate']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [
                LoginComponent,
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
