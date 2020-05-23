import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCinemasComponent } from './my-cinemas.component';

describe('MyCinemasComponent', () => {
  let component: MyCinemasComponent;
  let fixture: ComponentFixture<MyCinemasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCinemasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCinemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
