import { Route } from '@angular/router';
import { EditArticle } from './components/edit-article/edit-article';
import { EditArticleService } from './services/edit-article.service';
import * as editArticleEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { editArticleFeatureKey, editArticleReducer } from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: EditArticle,
    providers: [
      EditArticleService,
      provideEffects(editArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
    ],
  },
];
