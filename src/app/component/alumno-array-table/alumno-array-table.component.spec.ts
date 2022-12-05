import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoArrayTableComponent } from './alumno-array-table.component';

describe('AlumnoArrayTableComponent', () => {
  let component: AlumnoArrayTableComponent;
  let fixture: ComponentFixture<AlumnoArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoArrayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
