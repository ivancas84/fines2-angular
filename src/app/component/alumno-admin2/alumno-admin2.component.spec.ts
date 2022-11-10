import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAdmin2Component } from './alumno-admin2.component';

describe('AlumnoAdmin2Component', () => {
  let component: AlumnoAdmin2Component;
  let fixture: ComponentFixture<AlumnoAdmin2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAdmin2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
