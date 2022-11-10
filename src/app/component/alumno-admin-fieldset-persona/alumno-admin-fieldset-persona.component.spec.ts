import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAdminFieldsetPersonaComponent } from './alumno-admin-fieldset-persona.component';

describe('AlumnoAdminFieldsetPersonaComponent', () => {
  let component: AlumnoAdminFieldsetPersonaComponent;
  let fixture: ComponentFixture<AlumnoAdminFieldsetPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAdminFieldsetPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoAdminFieldsetPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
