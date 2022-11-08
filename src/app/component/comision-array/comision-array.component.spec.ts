import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionArrayComponent } from './comision-array.component';

describe('ComisionArrayComponent', () => {
  let component: ComisionArrayComponent;
  let fixture: ComponentFixture<ComisionArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
