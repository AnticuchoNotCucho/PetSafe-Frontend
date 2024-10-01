import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointInterestComponent } from './point-interest.component';

describe('PointInterestComponent', () => {
  let component: PointInterestComponent;
  let fixture: ComponentFixture<PointInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointInterestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
