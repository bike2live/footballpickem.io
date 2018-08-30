import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Component, Input } from "@angular/core";
import { DataService } from "../../core/data.service";
import { of } from "rxjs";

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let mockDataService;
    let GAMES;

    @Component({ selector: 'fa-icon', template: '<div></div>' })
    class FakeFaIcon {
        @Input() icon: any;
    }

    beforeEach(async(() => {
        GAMES = [
            {}
        ];
        mockDataService = jasmine.createSpyObj(['getSchedule', 'getWeeklyGuesses']);

        TestBed.configureTestingModule({
            declarations: [
                DashboardComponent,
                FakeFaIcon
            ],
            providers: [
                { provide: DataService, useValue: mockDataService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        mockDataService.getSchedule.and.returnValue(of(GAMES));
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
