import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoArraySearchComponent } from './alumno-array-search.component';

describe('AlumnoArraySearchComponent', () => {
  let component: AlumnoArraySearchComponent;
  let fixture: ComponentFixture<AlumnoArraySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoArraySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoArraySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
