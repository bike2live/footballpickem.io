import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFinishComponent } from './register-finish.component';

describe('RegisterFinishComponent', () => {
  let component: RegisterFinishComponent;
  let fixture: ComponentFixture<RegisterFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
