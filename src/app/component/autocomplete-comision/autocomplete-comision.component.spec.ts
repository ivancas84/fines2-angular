import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComisionComponent } from './autocomplete-comision.component';

describe('AutocompleteComisionComponent', () => {
  let component: AutocompleteComisionComponent;
  let fixture: ComponentFixture<AutocompleteComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
