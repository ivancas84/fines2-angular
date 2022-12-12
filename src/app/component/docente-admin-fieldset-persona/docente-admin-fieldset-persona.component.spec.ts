import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteAdminFieldsetPersonaComponent } from './docente-admin-fieldset-persona.component';

describe('DocenteAdminFieldsetPersonaComponent', () => {
  let component: DocenteAdminFieldsetPersonaComponent;
  let fixture: ComponentFixture<DocenteAdminFieldsetPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteAdminFieldsetPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocenteAdminFieldsetPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
