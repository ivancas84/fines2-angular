import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaArrayTableComponent } from './asignatura-array-table.component';

describe('AsignaturaArrayTableComponent', () => {
  let component: AsignaturaArrayTableComponent;
  let fixture: ComponentFixture<AsignaturaArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaArrayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
