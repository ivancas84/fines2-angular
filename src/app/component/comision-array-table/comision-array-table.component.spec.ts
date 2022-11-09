import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionArrayTableComponent } from './comision-array-table.component';

describe('ComisionArrayTableComponent', () => {
  let component: ComisionArrayTableComponent;
  let fixture: ComponentFixture<ComisionArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionArrayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
