import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature';
import {RouterModule} from "@angular/router";
import {NgxGrowthBookModule} from "ngx-growthbook";

@NgModule({
  declarations: [FeatureComponent],
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: FeatureComponent
    }
  ]), NgxGrowthBookModule],
})
export class LazyLoadedModule {}
