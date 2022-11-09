import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionArraySearchComponent } from './comision-array-search.component';

describe('ComisionArraySearchComponent', () => {
  let component: ComisionArraySearchComponent;
  let fixture: ComponentFixture<ComisionArraySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionArraySearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionArraySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
