import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleCardComponent } from './rule-card.component';

describe('RuleCardComponent', () => {
    let component: RuleCardComponent;
    let fixture: ComponentFixture<RuleCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RuleCardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RuleCardComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        component.rule = { frontTitle: 'front title', frontText: 'front text', frontImgClass: 'bobby',
                           rearTitle: 'rear title', rearText: 'rear text', rearImgClass: 'donny'
                         };
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
