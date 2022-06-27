import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureHideComponent } from './feature-hide.component';

describe('FeatureHideComponent', () => {
  let component: FeatureHideComponent;
  let fixture: ComponentFixture<FeatureHideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureHideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureHideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
