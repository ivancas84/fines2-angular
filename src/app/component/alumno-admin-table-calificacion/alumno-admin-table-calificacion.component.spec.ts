import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAdminTableCalificacionComponent } from './alumno-admin-table-calificacion.component';

describe('AlumnoAdminTableCalificacionComponent', () => {
  let component: AlumnoAdminTableCalificacionComponent;
  let fixture: ComponentFixture<AlumnoAdminTableCalificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAdminTableCalificacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoAdminTableCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
