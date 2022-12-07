import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoArraySearchComponent } from './curso-array-search.component';

describe('CursoArraySearchComponent', () => {
  let component: CursoArraySearchComponent;
  let fixture: ComponentFixture<CursoArraySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoArraySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoArraySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
