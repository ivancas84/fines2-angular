import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAdminArrayComponent } from './horario-admin-array.component';

describe('HorarioAdminArrayComponent', () => {
  let component: HorarioAdminArrayComponent;
  let fixture: ComponentFixture<HorarioAdminArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioAdminArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioAdminArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
