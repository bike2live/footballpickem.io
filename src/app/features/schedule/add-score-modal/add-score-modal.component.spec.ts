import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScoreModalComponent } from './add-score-modal.component';

describe('AddScoreModalComponent', () => {
  let component: AddScoreModalComponent;
  let fixture: ComponentFixture<AddScoreModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScoreModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScoreModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
