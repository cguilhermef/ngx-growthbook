import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GrowthBook, Attributes, FeatureDefinition } from "@growthbook/growthbook";
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  filter,
  first,
  map,
  Observable,
  of,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError
} from "rxjs";
export const GROWTHBOOK_CONFIG = new InjectionToken<GrowthbookConfig>('growthbook-service GROWTHBOOK_CONFIG');

type FeatureValType = string | number | boolean | null;
export interface GrowthBookFeatures {
  status: number;
  features: {[key: string]: FeatureDefinition};
}
export interface GrowthbookConfig {
  apiKey: string;
  featuresEndpoint?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GrowthBookService {
  private static loaded = false;
  private static growthBook$ = new BehaviorSubject<GrowthBook>(new GrowthBook());

  constructor(
    @Inject(GROWTHBOOK_CONFIG) private config: GrowthbookConfig,
    private http: HttpClient
  ) {
  }

  updateFeatures(): Observable<void> {
    return this.http.get<GrowthBookFeatures>(
      this.endpoint(),
    ).pipe(
      first(),
      map((response) => {
        const growthBook = new GrowthBook();
        growthBook.setFeatures(response.features);
        GrowthBookService.growthBook$.next(growthBook);
        GrowthBookService.loaded = true;
      }),
      catchError((err) => throwError(err))
    )
  }

  setAttributes(attributes: {[key: string]: FeatureValType}): Observable<void> {
    return GrowthBookService.growthBook$.pipe(
      map((gb) => gb.setAttributes(attributes))
    );
  }

  featureIsOn(feature: string): Observable<boolean> {
    return GrowthBookService.growthBook$.pipe(
      map((gb) => gb.isOn(feature))
    )
  }

  featureIsOff(feature: string): Observable<boolean> {
    return GrowthBookService.growthBook$.pipe(
      take(2),
      map((gb) => gb.isOff(feature))
    )
  }

  private endpoint(): string {
    const { apiKey, featuresEndpoint } = this.config;
    return !featuresEndpoint
      ? `https://cdn.growthbook.io/api/features/${ apiKey }`
      : `${ featuresEndpoint }/${ apiKey }`
  }
}
