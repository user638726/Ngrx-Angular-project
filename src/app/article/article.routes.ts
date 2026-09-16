import { Route } from "@angular/router";
import { Article } from "./component/article/article";
import { provideEffects } from "@ngrx/effects";
import * as articleEffects from './store/effects'
import { articleFeatureKey, articleReducer } from "./store/reducers";
import { provideState } from "@ngrx/store";
import { ArticleService } from "./services/article-service.service";
export const routes:Route[]=[
  {
    path:'',
    component:Article,
    providers:[
      provideEffects(articleEffects),
      provideState(articleFeatureKey,articleReducer),
      ArticleService,
    ]
  }
]
