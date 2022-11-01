import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeAdminFieldsetSedeComponent } from './sede-admin-fieldset-sede.component';

describe('SedeAdminFieldsetSedeComponent', () => {
  let component: SedeAdminFieldsetSedeComponent;
  let fixture: ComponentFixture<SedeAdminFieldsetSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeAdminFieldsetSedeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SedeAdminFieldsetSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
