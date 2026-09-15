import { createFeature, createReducer, on } from "@ngrx/store";
import { popularTagsActions } from "./actions";
import { PopularTagsStateInterface } from "../types/popularTagState.interface";

const initialState:PopularTagsStateInterface={
  isLoading:false,
  error:null,
  data:null,
}
const popularTagsFeature = createFeature({
  name:'popularTags',
  reducer:createReducer(
    initialState,
    on(popularTagsActions.getPopularTags,(state)=>({...state,isLoading:true})),
    on(popularTagsActions.getPopularTagsSuccess,(state,action)=>({...state,isLoading:false,data:action.popularTags})),
    on(popularTagsActions.getPopularTagsFailure,(state)=>({...state,isLoading:false})),
  ),
})

export const {
  name:popularTagsFeatureKey,
  reducer:popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData:selectPopularTagsData,
} = popularTagsFeature
