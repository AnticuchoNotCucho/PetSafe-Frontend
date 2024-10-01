import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundPetsComponent } from './found-pets.component';

describe('FoundPetsComponent', () => {
  let component: FoundPetsComponent;
  let fixture: ComponentFixture<FoundPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundPetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
