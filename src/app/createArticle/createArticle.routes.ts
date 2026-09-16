import { Route } from "@angular/router";
import { CreateArticle } from "./components/create-article/create-article";
import { CreateArticleService } from "./services/create-article.service";
import * as createArticleEffects from './store/effects'
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { createArticleFeatureKey, createArticleReducer } from './store/reducers';

export const routes:Route[]=[
  {
    path:'',
    component:CreateArticle,
    providers:[CreateArticleService,provideEffects(createArticleEffects),provideState(createArticleFeatureKey,createArticleReducer)]
  }
]
