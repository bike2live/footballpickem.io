import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleComponent } from './schedule.component';
import { of } from "rxjs";
import { DataService } from "../../core/data.service";
import { AuthService } from "../../users/auth.service";
import { BsModalService } from "ngx-bootstrap";

describe('ScheduleComponent', () => {
    let component: ScheduleComponent;
    let fixture: ComponentFixture<ScheduleComponent>;
    let mockDataService;
    let mockAuthService;
    let mockBSModalService;
    let GAMES;
    let user;


    beforeEach(async(() => {
        GAMES = [
            {}
        ];
        mockDataService = jasmine.createSpyObj(['getSchedule']);
        mockAuthService = jasmine.createSpyObj(['isAdmin', 'getUser']);
        mockBSModalService = jasmine.createSpyObj(['show']);


        TestBed.configureTestingModule({
            declarations: [ScheduleComponent],
            providers: [
                { provide: DataService, useValue: mockDataService },
                { provide: AuthService, useValue: mockAuthService },
                { provide: BsModalService, useValue: mockBSModalService },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        let admin = { name: 'Jack Jack', uid: '1', username: 'icecream', roles: ['ADMIN'] };
        mockAuthService.isAdmin.and.returnValue(true);
        mockAuthService.getUser.and.returnValue(admin);
        mockDataService.getSchedule.and.returnValue(of(GAMES));
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
