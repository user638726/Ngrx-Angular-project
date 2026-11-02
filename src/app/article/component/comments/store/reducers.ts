import { createFeature, createReducer, on } from "@ngrx/store"
import { routerNavigationAction } from "@ngrx/router-store"
import { CommentsStateInterface } from "../types/commentsState.interface"
import { commentsActions } from "./actions"

const initialState:CommentsStateInterface={
  isLoading:false,
  isSubmitting:false,
  data:[],
  validationErrors:null,
}
const commentsFeature = createFeature({
  name:'comments',
  reducer:createReducer(
    initialState,
    on(commentsActions.getComments,(state)=>({...state,isLoading:true})),
    on(commentsActions.getCommentsSuccess,(state,action)=>({...state,isLoading:false,data:action.comments})),
    on(commentsActions.getCommentsFailure,(state)=>({...state,isLoading:false})),
    on(commentsActions.createComment,(state)=>({...state,isSubmitting:true,validationErrors:null})),
    on(commentsActions.createCommentSuccess,(state,action)=>({...state,isSubmitting:false,data:[action.comment,...state.data]})),
    on(commentsActions.createCommentFailure,(state,action)=>({...state,isSubmitting:false,validationErrors:action.errors})),
    on(commentsActions.deleteCommentSuccess,(state,action)=>({...state,data:state.data.filter((comment)=>comment.id!==action.id)})),
    on(routerNavigationAction,()=>initialState)
  ),
})

export const {
  name:commentsFeatureKey,
  reducer:commentsReducer,
  selectIsLoading,
  selectIsSubmitting,
  selectData:selectCommentsData,
  selectValidationErrors,
} = commentsFeature
