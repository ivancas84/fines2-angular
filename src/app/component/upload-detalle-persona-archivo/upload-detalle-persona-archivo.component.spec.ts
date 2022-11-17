import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDetallePersonaArchivoComponent } from './upload-detalle-persona-archivo.component';

describe('UploadDetallePersonaArchivoComponent', () => {
  let component: UploadDetallePersonaArchivoComponent;
  let fixture: ComponentFixture<UploadDetallePersonaArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDetallePersonaArchivoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDetallePersonaArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
