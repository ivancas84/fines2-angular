import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionAdminFieldsetCursoComponent } from './comision-admin-fieldset-curso.component';

describe('ComisionAdminFieldsetCursoComponent', () => {
  let component: ComisionAdminFieldsetCursoComponent;
  let fixture: ComponentFixture<ComisionAdminFieldsetCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionAdminFieldsetCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionAdminFieldsetCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
