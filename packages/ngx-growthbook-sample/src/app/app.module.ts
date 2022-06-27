import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {growthBookRootProvider, NgxGrowthBookModule} from "ngx-growthbook";
import {RouterModule} from "@angular/router";
import {growthBookApiKey}  from '../../../../env';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxGrowthBookModule.forRoot({
    apiKey: growthBookApiKey
  }), RouterModule.forRoot([{
    path: 'lazy-module',
    loadChildren: () => import('./lazy-loaded/lazy-loaded.module').then((m) => m.LazyLoadedModule)
  }])],
  providers: [
    growthBookRootProvider()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
