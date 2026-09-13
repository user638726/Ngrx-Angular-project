import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideHttpClient } from '@angular/common/http';
import * as authEffects from '../app/auth/store/effects'
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore(),
    provideState(authFeatureKey,authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge:25,
      logOnly:!isDevMode(),
      autoPause:true,
      trace:false,
      traceLimit:75,
    }),
    provideHttpClient(),
  ],

};
