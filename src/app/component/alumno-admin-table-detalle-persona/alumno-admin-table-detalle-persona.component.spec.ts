import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAdminTableDetallePersonaComponent } from './alumno-admin-table-detalle-persona.component';

describe('AlumnoAdminTableDetallePersonaComponent', () => {
  let component: AlumnoAdminTableDetallePersonaComponent;
  let fixture: ComponentFixture<AlumnoAdminTableDetallePersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAdminTableDetallePersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoAdminTableDetallePersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
