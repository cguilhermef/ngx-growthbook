import { Component } from '@angular/core';
import {GrowthBookService} from "ngx-growthbook";

@Component({
  selector: 'ngx-gb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  featureIsOn$ = this.gbService.featureIsOn('hello-world-simple');

  constructor(
    private gbService: GrowthBookService
  ) {
  }

  update() {
    this.gbService.updateFeatures().subscribe()
  }
}
