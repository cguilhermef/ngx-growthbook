import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureComponent } from './feature.component';
import {NgxGrowthBookModule} from "ngx-growthbook";

describe('FeatureComponent', () => {
  let component: FeatureComponent;
  let fixture: ComponentFixture<FeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeatureComponent],
      imports: [NgxGrowthBookModule.forTests()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
