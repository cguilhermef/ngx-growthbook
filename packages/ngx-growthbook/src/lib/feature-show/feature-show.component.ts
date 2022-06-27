import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FeatureValType} from "../types";
import {GrowthBookService} from "../growthbook.service";
import {BehaviorSubject, switchMap, takeWhile, tap} from "rxjs";

@Component({
  selector: 'ngx-gb-feature-show',
  template: `<ng-container *ngIf="(show$ | async) ?? default === 'show'"
  ><ng-content></ng-content></ng-container>`,
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureShowComponent implements OnDestroy{

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
    switchMap((key) => this.service.featureIsOn(key)),
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
