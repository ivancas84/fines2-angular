import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAdminArrayTableComponent } from './horario-admin-array-table.component';

describe('HorarioAdminArrayTableComponent', () => {
  let component: HorarioAdminArrayTableComponent;
  let fixture: ComponentFixture<HorarioAdminArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioAdminArrayTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioAdminArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
