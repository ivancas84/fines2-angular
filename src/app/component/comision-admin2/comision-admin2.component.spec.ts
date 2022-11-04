import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionAdmin2Component } from './comision-admin2.component';

describe('ComisionAdmin2Component', () => {
  let component: ComisionAdmin2Component;
  let fixture: ComponentFixture<ComisionAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionAdmin2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
