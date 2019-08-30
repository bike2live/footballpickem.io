import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { UsersComponent } from './users.component';
import { DataService } from "../../core/data.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let mockDataService;
    let USERS;

    @Component({
        selector: 'fa-icon',
        template: '<div></div>'
    })
    class FakeFaIcon {
        @Input() icon: any;
    }

    beforeEach(async(() => {
        USERS = [
            { name: 'Bob', uid: '1', username: 'bobk', roles: ['homer', 'artist']},
            { name: 'Sally', uid: '2', username: 'sallyw', roles: ['homer', 'artist']},
            { name: 'John', uid: '3', username: 'johnh', roles: ['homer', 'artist']},
        ];
        mockDataService = jasmine.createSpyObj(['getUserList']);

        TestBed.configureTestingModule({
            declarations: [
                UsersComponent,
                FakeFaIcon
            ],
            providers: [
                {provide: DataService, useValue: mockDataService }
            ],
            // schemas: [
            //     CUSTOM_ELEMENTS_SCHEMA
            // ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsersComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        mockDataService.getUserList.and.returnValue(of(USERS));
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });

    it('should set users correctly from the service', () => {
        mockDataService.getUserList.and.returnValue(of(USERS));
        fixture.detectChanges();

        expect(component.users.length).toBe(3);
    });

    it('should create on tr for each user', () => {
        mockDataService.getUserList.and.returnValue(of(USERS));
        fixture.detectChanges();

        expect(fixture.debugElement.queryAll(By.css('tr')).length).toBe(4);
    });
});
