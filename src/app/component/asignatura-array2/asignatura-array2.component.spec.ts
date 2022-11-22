import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaArray2Component } from './asignatura-array2.component';

describe('AsignaturaArray2Component', () => {
  let component: AsignaturaArray2Component;
  let fixture: ComponentFixture<AsignaturaArray2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaArray2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaArray2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
