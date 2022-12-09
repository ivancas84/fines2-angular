import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomaPosesionEmailComponent } from './toma-posesion-email.component';

describe('TomaPosesionEmailComponent', () => {
  let component: TomaPosesionEmailComponent;
  let fixture: ComponentFixture<TomaPosesionEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TomaPosesionEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TomaPosesionEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
