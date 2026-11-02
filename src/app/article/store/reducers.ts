import { createFeature, createReducer, on } from "@ngrx/store"
import { ArticleStateInterface } from "../types/articleState.interface"
import { articleActions } from "./actions"
import { routerNavigationAction } from "@ngrx/router-store"
import { addToFavoritesActions } from "../../shared/components/add-to-favorites/store/actions"
import { followUserActions } from "../../shared/components/follow-user/store/actions"

const initialState:ArticleStateInterface={
  isLoading:false,
  error:null,
  data:null,
}
const articleFeature = createFeature({
  name:'article',
  reducer:createReducer(
    initialState,
    on(articleActions.getArticle,(state)=>({...state,isLoading:true})),
    on(articleActions.getArticleSuccess,(state,action)=>({...state,isLoading:false,data:action.article})),
    on(articleActions.getArticleFailure,(state)=>({...state,isLoading:false})),
    // the article page shows Follow/Favorite twice (top and bottom); mirroring the click in the store keeps both in sync
    on(addToFavoritesActions.addToFavorites,(state,action)=>{
      if(!state.data || state.data.slug !== action.slug){
        return state
      }
      const favoritesCount = state.data.favoritesCount + (action.isFavorited ? -1 : 1)
      return {...state,data:{...state.data,favorited:!action.isFavorited,favoritesCount}}
    }),
    on(followUserActions.followUser,(state,action)=>{
      if(!state.data || state.data.author.username !== action.username){
        return state
      }
      return {...state,data:{...state.data,author:{...state.data.author,following:!action.isFollowing}}}
    }),
    on(routerNavigationAction,()=>initialState)
  ),
})

export const {
  name:articleFeatureKey,
  reducer:articleReducer,
  selectIsLoading,
  selectError,
  selectData:selectArticleData,
} = articleFeature
