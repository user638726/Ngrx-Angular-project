import { Component, inject } from '@angular/core';
import { ArticleForm } from '../../../shared/components/article-form/article-form';
import { ArticleFormValuesInterface } from '../../../shared/components/article-form/types/articleFormValues.interface';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface';
import { createArticleActions } from '../../store/actions';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [ArticleForm,AsyncPipe],
  selector: 'app-create-article',
  styleUrl: './create-article.css',
  templateUrl: './create-article.html',
})
export class CreateArticle {
  private store = inject(Store);
  initialValues={
    title:'',
    description:'',
    body:'',
    tagList:[],
  }

  data$ =combineLatest({
    isSubmmitting:this.store.select(selectIsSubmitting),
    backendErrors:this.store.select(selectValidationErrors),
  })
  onSubmit(articleFormValues:ArticleFormValuesInterface):void{
    const request:ArticleRequestInterface={
      article:articleFormValues,
    }
    this.store.dispatch(createArticleActions.createArticle({request}))
  }
}
