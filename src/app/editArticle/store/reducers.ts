import { createFeature, createReducer, on } from "@ngrx/store"
import { EditArticleStateInterface } from "../types/editArticleState.interface"
import { editArticleActions } from "./actions"
import { routerNavigationAction } from "@ngrx/router-store"

const initialState:EditArticleStateInterface={
  article:null,
  isLoading:false,
  isSubmitting:false,
  ValidationErrors:null
}
const editArticleFeature = createFeature({
  name:'editArticle',
  reducer:createReducer(
    initialState,
    on(editArticleActions.getArticle,(state)=>({...state,isLoading:true})),
    on(editArticleActions.getArticleSuccess,(state,action)=>({...state,isLoading:false,article:action.article})),
    on(editArticleActions.getArticleFailure,(state)=>({...state,isLoading:false})),
    on(editArticleActions.updateArticle,(state)=>({...state,isSubmitting:true})),
    on(editArticleActions.updateArticleSuccess,(state)=>({...state,isSubmitting:false})),
    on(editArticleActions.updateArticleFailure,(state,action)=>({...state,isSubmitting:false,ValidationErrors:action.errors})),
    on(routerNavigationAction,()=>initialState)
  ),
})

export const {
  name:editArticleFeatureKey,
  reducer:editArticleReducer,
  selectIsLoading,
  selectArticle,
  selectIsSubmitting,
  selectValidationErrors,
} = editArticleFeature
