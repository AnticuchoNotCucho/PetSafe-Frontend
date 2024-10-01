import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundPetModalComponent } from './found-pet-modal.component';

describe('FoundPetModalComponent', () => {
  let component: FoundPetModalComponent;
  let fixture: ComponentFixture<FoundPetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundPetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundPetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
