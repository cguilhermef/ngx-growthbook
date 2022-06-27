import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GrowthBook, FeatureDefinition } from "@growthbook/growthbook";
import {HttpClient} from "@angular/common/http";
import {
  BehaviorSubject,
  catchError,
  first,
  map,
  Observable, ReplaySubject, Subject,
  take, tap,
  throwError
} from "rxjs";
import { FeatureValType } from './types';

export const GROWTHBOOK_CONFIG = new InjectionToken<GrowthbookConfig>('growthbook-service GROWTHBOOK_CONFIG');

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

  private gb$ = new BehaviorSubject<GrowthBook>(new GrowthBook());
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
        this.gb$.value.setFeatures(response.features);
        this.gb$.next(this.gb$.value);
      }),
      catchError((err) => throwError(err))
    )
  }

  setAttributes(attributes: {[key: string]: FeatureValType}): Observable<void> {
    return this.gb$.pipe(
      map((gb) => gb.setAttributes(attributes))
    );
  }

  featureIsOn(feature: string): Observable<boolean> {
    return this.gb$.pipe(
      map((gb) => gb.isOn(feature))
    )
  }

  featureIsOff(feature: string): Observable<boolean> {
    return this.gb$.pipe(
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
