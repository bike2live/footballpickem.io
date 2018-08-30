import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScoreModalComponent } from './add-score-modal.component';
import { FormsModule } from "@angular/forms";
import { DataService } from "../../../core/data.service";
import { BsModalRef } from "ngx-bootstrap";
import { UserScore } from "./userScore";
import { Game } from "../../game";
import { of } from "rxjs";

describe('AddScoreModalComponent', () => {
    let component: AddScoreModalComponent;
    let fixture: ComponentFixture<AddScoreModalComponent>;
    let mockDataService;
    let mockBsModalRef;

    beforeEach(async(() => {
        mockDataService = jasmine.createSpyObj(['getUserScore', 'addUserScore']);
        mockBsModalRef = jasmine.createSpyObj(['hide']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AddScoreModalComponent],
            providers: [
                {provide: DataService, useValue: mockDataService},
                {provide: BsModalRef, useValue: mockBsModalRef},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddScoreModalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.userScore = new UserScore();
        component.game = new Game();
        mockDataService.getUserScore.and.returnValue(of({}))
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
