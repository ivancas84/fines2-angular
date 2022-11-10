import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAdminFieldsetAlumnoComponent } from './alumno-admin-fieldset-alumno.component';

describe('AlumnoAdminFieldsetAlumnoComponent', () => {
  let component: AlumnoAdminFieldsetAlumnoComponent;
  let fixture: ComponentFixture<AlumnoAdminFieldsetAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAdminFieldsetAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoAdminFieldsetAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
