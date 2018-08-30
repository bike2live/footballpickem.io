import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameScoreModalComponent } from './add-game-score-modal.component';
import { FormsModule } from "@angular/forms";
import { DataService } from "../../../core/data.service";
import { BsModalRef } from "ngx-bootstrap";
import { Game } from "../../game";

describe('AddGameScoreModalComponent', () => {
    let component: AddGameScoreModalComponent;
    let fixture: ComponentFixture<AddGameScoreModalComponent>;
    let mockDataService;
    let mockBsModalRef;

    beforeEach(async(() => {
        mockDataService = jasmine.createSpyObj(['editGameScore']);
        mockBsModalRef = jasmine.createSpyObj(['hide']);

        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [AddGameScoreModalComponent],
            providers: [
                { provide: DataService, useValue: mockDataService },
                { provide: BsModalRef, useValue: mockBsModalRef },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddGameScoreModalComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.game = new Game();
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
