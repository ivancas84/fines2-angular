import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoArrayTableComponent } from './curso-array-table.component';

describe('CursoArrayTableComponent', () => {
  let component: CursoArrayTableComponent;
  let fixture: ComponentFixture<CursoArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoArrayTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
