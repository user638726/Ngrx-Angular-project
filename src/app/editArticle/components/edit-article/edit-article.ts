import { Component, inject, OnInit } from '@angular/core';
import { ArticleForm } from '../../../shared/components/article-form/article-form';
import { ArticleFormValuesInterface } from '../../../shared/components/article-form/types/articleFormValues.interface';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { selectValidationErrors,selectIsLoading,selectArticle, selectIsSubmitting } from '../../store/reducers';
import { ArticleRequestInterface } from '../../../shared/types/articleRequest.interface';
import { editArticleActions } from '../../store/actions';
import { AsyncPipe } from '@angular/common';
import { Loading } from '../../../shared/components/loading/loading';
import { ActivatedRoute } from '@angular/router';
import { ArticleInterface } from '../../../shared/types/article.interface';

@Component({
  imports: [ArticleForm,AsyncPipe,Loading],
  selector: 'app-edit-article',
  styleUrl: './edit-article.css',
  templateUrl: './edit-article.html',
})
export class EditArticle implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  slug = this.route.snapshot.paramMap.get('slug')??''
  initialValues$:Observable<ArticleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article):article is ArticleInterface=>article!==null),
    map((article:ArticleInterface)=>{
      return{
        title:article.title,
        description:article.description,
        body:article.body,
        tagList:article.tagList
      }
    })
  )
  data$ =combineLatest({
    isSubmitting:this.store.select(selectIsSubmitting),
    backendErrors:this.store.select(selectValidationErrors),
    isLoading:this.store.select(selectIsLoading),
    initialValues:this.initialValues$
  })
  ngOnInit(): void {
    this.store.dispatch(editArticleActions.getArticle({slug:this.slug}))
  }
  onSubmit(articleFormValues:ArticleFormValuesInterface):void{
    const request:ArticleRequestInterface={
      article:articleFormValues,
    }
    this.store.dispatch(editArticleActions.updateArticle({request,slug:this.slug}))
  }
}
