import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureShowComponent } from './feature-show.component';

describe('FeatureShowComponent', () => {
  let component: FeatureShowComponent;
  let fixture: ComponentFixture<FeatureShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureShowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
