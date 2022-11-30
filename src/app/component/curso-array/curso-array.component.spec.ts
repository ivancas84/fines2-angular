import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoArrayComponent } from './curso-array.component';

describe('CursoArrayComponent', () => {
  let component: CursoArrayComponent;
  let fixture: ComponentFixture<CursoArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
