import {APP_INITIALIZER} from "@angular/core";
import {GrowthBookService} from "./growthbook.service";

/**
 * Use this provider to guarantee the growtbook setup will
 * be done before the app start.
 */
export function growthBookRootProvider() {
  return {
    provide: APP_INITIALIZER,
    useFactory: (service: GrowthBookService) => () => {
      return service.updateFeatures()
    },
    deps: [GrowthBookService],
    multi: true,
  }
}
