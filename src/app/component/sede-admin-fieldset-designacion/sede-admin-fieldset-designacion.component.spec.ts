import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeAdminFieldsetDesignacionComponent } from './sede-admin-fieldset-designacion.component';

describe('SedeAdminFieldsetDesignacionComponent', () => {
  let component: SedeAdminFieldsetDesignacionComponent;
  let fixture: ComponentFixture<SedeAdminFieldsetDesignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeAdminFieldsetDesignacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeAdminFieldsetDesignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
