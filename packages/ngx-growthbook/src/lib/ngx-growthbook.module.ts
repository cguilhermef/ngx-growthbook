import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {GROWTHBOOK_CONFIG, GrowthbookConfig, GrowthBookService} from './growthbook.service';
import { FeatureShowComponent } from './feature-show';
import { FeatureHideComponent } from './feature-hide';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule, FeatureShowComponent, FeatureHideComponent],
  declarations: [FeatureShowComponent, FeatureHideComponent],
})
export class NgxGrowthBookModule {
  static forRoot(
    config: GrowthbookConfig
  ): ModuleWithProviders<NgxGrowthBookModule> {
    return {
      ngModule: NgxGrowthBookModule,
      providers: [
        { provide: GROWTHBOOK_CONFIG, useValue: config },
      ],
    };
  }
  static forTests(): ModuleWithProviders<NgxGrowthBookModule> {
    return {
      ngModule: NgxGrowthBookModule,
      providers: [{ provide: GROWTHBOOK_CONFIG, useValue: {} }, GrowthBookService],
    };
  }
}
