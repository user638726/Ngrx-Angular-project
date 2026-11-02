import { Route } from "@angular/router";
import { Settings } from "./components/settings/settings";
import { provideState } from "@ngrx/store";
import { settingFeatureKey, settingsReducer } from "./store/reducers";

export const routes:Route[]=[
  {
    path:'',
    component:Settings,
    providers:[provideState(settingFeatureKey,settingsReducer)]
  }
]
