import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeAdminFieldsetComisionComponent } from './sede-admin-fieldset-comision.component';

describe('SedeAdminFieldsetComisionComponent', () => {
  let component: SedeAdminFieldsetComisionComponent;
  let fixture: ComponentFixture<SedeAdminFieldsetComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeAdminFieldsetComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeAdminFieldsetComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
