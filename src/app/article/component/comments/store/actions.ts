import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CommentInterface } from "../types/comment.interface";
import { CommentRequestInterface } from "../types/commentRequest.interface";
import { BackendErrorsInterface } from "../../../../shared/types/backendErrors.interface";

export const commentsActions = createActionGroup({
  source:'Comments',
  events:{
    'Get comments':props<{slug:string}>(),
    'Get comments success':props<{comments:CommentInterface[]}>(),
    'Get comments failure':emptyProps(),

    'Create comment':props<{slug:string;commentRequest:CommentRequestInterface}>(),
    'Create comment success':props<{comment:CommentInterface}>(),
    'Create comment failure':props<{errors:BackendErrorsInterface}>(),

    'Delete comment':props<{slug:string;id:number}>(),
    'Delete comment success':props<{id:number}>(),
    'Delete comment failure':emptyProps(),
  }
})
