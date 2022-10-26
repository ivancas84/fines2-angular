import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeAdmin2Component } from './sede-admin2.component';

describe('SedeAdmin2Component', () => {
  let component: SedeAdmin2Component;
  let fixture: ComponentFixture<SedeAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeAdmin2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
