import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAdminTableAlumnoComisionComponent } from './alumno-admin-table-alumno-comision.component';

describe('AlumnoAdminTableAlumnoComisionComponent', () => {
  let component: AlumnoAdminTableAlumnoComisionComponent;
  let fixture: ComponentFixture<AlumnoAdminTableAlumnoComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAdminTableAlumnoComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoAdminTableAlumnoComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
