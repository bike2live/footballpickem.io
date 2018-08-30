import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardComponent } from './leaderboard.component';
import { Component, Input } from "@angular/core";
import { DataService } from "../../core/data.service";
import { of } from "rxjs";
import { PlayerStanding } from "./player-standing";

describe('LeaderboardComponent', () => {
    let component: LeaderboardComponent;
    let fixture: ComponentFixture<LeaderboardComponent>;
    let mockDataService;
    let PLAYER_STANDINGS;

    @Component({ selector: 'fa-icon', template: '<div></div>' })
    class FakeFaIcon {
        @Input() icon: any;
    }


    beforeEach(async(() => {
        mockDataService = jasmine.createSpyObj(['getPlayerStandings']);
        PLAYER_STANDINGS = [
            {}
        ];

        TestBed.configureTestingModule({
            declarations: [
                LeaderboardComponent,
                FakeFaIcon
            ],
            providers: [
                { provide: DataService, useValue: mockDataService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaderboardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        mockDataService.getPlayerStandings.and.returnValue(of(PLAYER_STANDINGS));
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
