import { createActionGroup, props } from "@ngrx/store";
import { ArticleRequestInterface } from "../../shared/types/articleRequest.interface";
import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { ArticleInterface } from "../../shared/types/article.interface";

export const createArticleActions = createActionGroup({
  source:'create article',
  events:{
    'Create article':props<{request:ArticleRequestInterface}>(),
    'Create article success':props<{article:ArticleInterface}>(),
    'Create article failure':props<{errors:BackendErrorsInterface}>(),
  }
})
