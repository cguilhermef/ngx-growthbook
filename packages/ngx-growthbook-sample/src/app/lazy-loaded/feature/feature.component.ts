import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {GrowthBookService} from "ngx-growthbook";

@Component({
  selector: 'ngx-gb-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureComponent {

  featureIsOn$ = this.gbService.featureIsOn('hello-world-simple')

  constructor(
    private gbService: GrowthBookService
  ) {
  }

}
