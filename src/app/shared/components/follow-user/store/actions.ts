import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProfileInterface } from "../../../types/profile.interface";

export const followUserActions = createActionGroup({
  source:'Follow user',
  events:{
    'Follow user':props<{isFollowing:boolean;username:string}>(),
    'Follow user success':props<{profile:ProfileInterface}>(),
    'Follow user failure':emptyProps(),
  }
})
