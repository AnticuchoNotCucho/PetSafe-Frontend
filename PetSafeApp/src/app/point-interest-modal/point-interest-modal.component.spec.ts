import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointInterestModalComponent } from './point-interest-modal.component';

describe('PointInterestModalComponent', () => {
  let component: PointInterestModalComponent;
  let fixture: ComponentFixture<PointInterestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointInterestModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointInterestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
