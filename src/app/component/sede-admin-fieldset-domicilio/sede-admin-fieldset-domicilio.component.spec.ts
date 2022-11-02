import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeAdminFieldsetDomicilioComponent } from './sede-admin-fieldset-domicilio.component';

describe('SedeAdminFieldsetDomicilioComponent', () => {
  let component: SedeAdminFieldsetDomicilioComponent;
  let fixture: ComponentFixture<SedeAdminFieldsetDomicilioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeAdminFieldsetDomicilioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SedeAdminFieldsetDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
