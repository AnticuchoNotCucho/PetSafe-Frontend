import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LostPetModalComponent } from './lost-pet-modal.component';

describe('LostPetModalComponent', () => {
  let component: LostPetModalComponent;
  let fixture: ComponentFixture<LostPetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LostPetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LostPetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
