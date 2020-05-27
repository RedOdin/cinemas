import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaChoiceComponent } from './cinema-choice.component';

describe('CinemaChoiceComponent', () => {
  let component: CinemaChoiceComponent;
  let fixture: ComponentFixture<CinemaChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
