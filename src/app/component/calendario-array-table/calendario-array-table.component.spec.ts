import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioArrayTableComponent } from './calendario-array-table.component';

describe('CalendarioArrayTableComponent', () => {
  let component: CalendarioArrayTableComponent;
  let fixture: ComponentFixture<CalendarioArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioArrayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
