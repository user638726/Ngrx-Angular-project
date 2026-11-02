import { Route } from "@angular/router";
import { UserProfile } from "./components/user-profile/user-profile";
import { UserProfileService } from "./services/user-profile.service";
import { provideState } from "@ngrx/store";
import { userProfileFeatureKey, userProfileReducer } from "./store/reducers";
import * as userProfileEffects from './store/effects'
import { provideEffects } from "@ngrx/effects";

export const routes:Route[]=[
  {
    path:'',
    component:UserProfile,
    providers:[UserProfileService,
      provideState(userProfileFeatureKey,userProfileReducer),
      provideEffects(userProfileEffects),
    ],
  }
]
