import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoArrayComponent } from './alumno-array.component';

describe('AlumnoArrayComponent', () => {
  let component: AlumnoArrayComponent;
  let fixture: ComponentFixture<AlumnoArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoArrayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
