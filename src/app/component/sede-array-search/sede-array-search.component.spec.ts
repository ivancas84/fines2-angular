import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeArraySearchComponent } from './sede-array-search.component';

describe('SedeArraySearchComponent', () => {
  let component: SedeArraySearchComponent;
  let fixture: ComponentFixture<SedeArraySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeArraySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeArraySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
