import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeArrayComponent } from './sede-array.component';

describe('SedeArrayComponent', () => {
  let component: SedeArrayComponent;
  let fixture: ComponentFixture<SedeArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeArrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
