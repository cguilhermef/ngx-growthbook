import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FeatureValType} from "../types";
import {BehaviorSubject, switchMap, takeWhile} from "rxjs";
import {GrowthBookService} from "../growthbook.service";

@Component({
  selector: 'ngx-gb-feature-hide',
  template: `<ng-container *ngIf="(show$ | async) ?? default === 'show'"
  ><ng-content></ng-content></ng-container>`,
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureHideComponent implements OnDestroy{

  active = true;
  @Input()
  set featureKey(key: string){
    this.featureKey$.next(key);
  };
  get featureKey(): string {
    return this.featureKey$.value;
  }
  @Input() default: 'show' | 'hide' = 'hide';

  featureKey$ = new BehaviorSubject<string>('');

  show$ = this.featureKey$.pipe(
    switchMap((key) => this.service.featureIsOff(key)),
    takeWhile(() => this.active)
  );

  ngOnDestroy() {
    this.active = false;
  }

  constructor(
    private service: GrowthBookService
  ) {
  }
}
