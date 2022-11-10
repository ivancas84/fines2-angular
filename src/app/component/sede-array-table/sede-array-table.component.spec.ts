import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeArrayTableComponent } from './sede-array-table.component';

describe('SedeArrayTableComponent', () => {
  let component: SedeArrayTableComponent;
  let fixture: ComponentFixture<SedeArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeArrayTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
