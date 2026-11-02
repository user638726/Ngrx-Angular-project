import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetFeedResponseInterface } from "../types/getFeedResponse.interface";

export const feedActions = createActionGroup({
  source:'feed',
  events:{
    'Get Feed':props<{url:string}>(),
    'Get Feed success':props<{feed:GetFeedResponseInterface}>(),
    'Get Feed failure':emptyProps(),

    'Remove article':props<{slug:string}>(),
  }
})
