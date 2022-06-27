import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {GROWTHBOOK_CONFIG, GrowthbookConfig} from "./growthbook.service";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [HttpClientModule]
})
export class NgxGrowthBookModule {
  static forRoot(config: GrowthbookConfig): ModuleWithProviders<NgxGrowthBookModule> {
    return {
      ngModule: NgxGrowthBookModule,
      providers: [
        {provide: GROWTHBOOK_CONFIG, useValue: config},
      ],
    };
  }
  static forTests(): ModuleWithProviders<NgxGrowthBookModule> {
    return {
      ngModule: NgxGrowthBookModule,
      providers: [
        {provide: GROWTHBOOK_CONFIG, useValue: {}},
      ],
    };
  }
}
