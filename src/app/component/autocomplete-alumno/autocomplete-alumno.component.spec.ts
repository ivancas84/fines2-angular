import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteAlumnoComponent } from './autocomplete-alumno.component';

describe('AutocompleteAlumnoComponent', () => {
  let component: AutocompleteAlumnoComponent;
  let fixture: ComponentFixture<AutocompleteAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
