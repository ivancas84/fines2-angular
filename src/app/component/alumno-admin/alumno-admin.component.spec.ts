import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoAdminComponent } from './alumno-admin.component';

describe('AlumnoAdminComponent', () => {
  let component: AlumnoAdminComponent;
  let fixture: ComponentFixture<AlumnoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
