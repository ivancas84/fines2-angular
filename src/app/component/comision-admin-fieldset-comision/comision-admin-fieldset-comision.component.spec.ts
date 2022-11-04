import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionAdminFieldsetComisionComponent } from './comision-admin-fieldset-comision.component';

describe('ComisionAdminFieldsetComisionComponent', () => {
  let component: ComisionAdminFieldsetComisionComponent;
  let fixture: ComponentFixture<ComisionAdminFieldsetComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionAdminFieldsetComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionAdminFieldsetComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
