import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameScoreModalComponent } from './add-game-score-modal.component';

describe('AddGameScoreModalComponent', () => {
  let component: AddGameScoreModalComponent;
  let fixture: ComponentFixture<AddGameScoreModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGameScoreModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGameScoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
