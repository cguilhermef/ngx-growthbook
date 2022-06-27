import { Component } from '@angular/core';
import {GrowthBookService} from "ngx-growthbook";

@Component({
  selector: 'ngx-gb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  featureIsOn$ = this.gbService.featureIsOn('hello-world-simple');
  userId = 301879;
  constructor(
    private gbService: GrowthBookService
  ) {
    this.gbService.setAttributes({
      userId: this.userId
    })
  }

  update() {
    this.gbService.updateFeatures().subscribe();
  }

  changeAttributes() {
    this.gbService.setAttributes({
      userId: ++this.userId
    });
  }
}
