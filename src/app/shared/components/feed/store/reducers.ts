import { createFeature, createReducer, on } from "@ngrx/store";
import { FeedStateInterface } from "../types/feedState.interface";
import { feedActions } from "./actions";
import { routerNavigationAction } from "@ngrx/router-store";

const initialState:FeedStateInterface={
  isLoading:false,
  error:null,
  data:null,
}
const feedFeature = createFeature({
  name:'feed',
  reducer:createReducer(
    initialState,
    on(feedActions.getFeed,(state)=>({...state,isLoading:true})),
    on(feedActions.getFeedSuccess,(state,action)=>({...state,isLoading:false,data:action.feed})),
    on(feedActions.getFeedFailure,(state)=>({...state,isLoading:false})),
    on(feedActions.removeArticle,(state,action)=>{
      if(!state.data){
        return state
      }
      const articles = state.data.articles.filter((article)=>article.slug!==action.slug)
      const removedCount = state.data.articles.length - articles.length
      return {...state,data:{articles,articlesCount:state.data.articlesCount-removedCount}}
    }),
    on(routerNavigationAction,()=>initialState)
  ),
})

export const {
  name:feedFeatureKey,
  reducer:feedReducer,
  selectIsLoading,
  selectError,
  selectData:selectFeedData,
} = feedFeature
