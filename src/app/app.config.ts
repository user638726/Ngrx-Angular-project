import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import * as authEffects from '../app/auth/store/effects'
import { provideEffects } from '@ngrx/effects';
import {provideRouterStore,routerReducer} from '@ngrx/router-store'
import { authInterceptor } from './shared/services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      router:routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey,authReducer),
    provideEffects(authEffects),
    provideStoreDevtools({
      maxAge:25,
      logOnly:!isDevMode(),
      autoPause:true,
      trace:false,
      traceLimit:75,
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],

};
