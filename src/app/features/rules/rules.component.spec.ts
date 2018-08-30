import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesComponent } from './rules.component';
import { Component, Input } from "@angular/core";
import { Rule } from "./rule";
import { RuleCardComponent } from "./rule-card/rule-card.component";

describe('RulesComponent', () => {
    let component: RulesComponent;
    let fixture: ComponentFixture<RulesComponent>;

    @Component({ selector: 'fp-rule-card', template: '<div></div>' })
    class FakeRuleCardComponent {
        @Input() rule: Rule;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RulesComponent,
                FakeRuleCardComponent
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RulesComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });
});
