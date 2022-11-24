import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarConstanciaComponent } from './generar-constancia.component';

describe('GenerarConstanciaComponent', () => {
  let component: GenerarConstanciaComponent;
  let fixture: ComponentFixture<GenerarConstanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarConstanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarConstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
