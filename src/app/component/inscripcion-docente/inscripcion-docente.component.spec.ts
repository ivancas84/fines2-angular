import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionDocenteComponent } from './inscripcion-docente.component';

describe('InscripcionDocenteComponent', () => {
  let component: InscripcionDocenteComponent;
  let fixture: ComponentFixture<InscripcionDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscripcionDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscripcionDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
