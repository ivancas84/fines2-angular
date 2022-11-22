import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioArray2Component } from './calendario-array2.component';

describe('CalendarioArray2Component', () => {
  let component: CalendarioArray2Component;
  let fixture: ComponentFixture<CalendarioArray2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioArray2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioArray2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
