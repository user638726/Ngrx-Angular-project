import { Component, inject, input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { combineLatest } from 'rxjs';
import { commentsActions } from './store/actions';
import { selectCommentsData, selectIsLoading, selectIsSubmitting, selectValidationErrors } from './store/reducers';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { BackendErrorMessages } from '../../../shared/components/backend-error-messages/backend-error-messages';
import { Loading } from '../../../shared/components/loading/loading';

@Component({
  imports: [AsyncPipe, RouterLink, ReactiveFormsModule, BackendErrorMessages, Loading],
  selector: 'app-comments',
  styleUrl: './comments.css',
  templateUrl: './comments.html',
})
export class Comments implements OnInit {
  slug = input<string>('');

  private store = inject(Store)
  private fb = inject(FormBuilder)
  private actions$ = inject(Actions)

  form = this.fb.nonNullable.group({
    body:'',
  })
  data$ = combineLatest({
    isLoading:this.store.select(selectIsLoading),
    isSubmitting:this.store.select(selectIsSubmitting),
    comments:this.store.select(selectCommentsData),
    validationErrors:this.store.select(selectValidationErrors),
    currentUser:this.store.select(selectCurrentUser),
  })

  constructor(){
    // clear the textarea only after the comment was saved, so a failed post keeps the text
    this.actions$.pipe(
      ofType(commentsActions.createCommentSuccess),
      takeUntilDestroyed(),
    ).subscribe(()=>this.form.reset())
  }
  ngOnInit(): void {
    this.store.dispatch(commentsActions.getComments({slug:this.slug()}))
  }
  submit():void{
    const body = this.form.getRawValue().body.trim()
    if(!body){
      return
    }
    this.store.dispatch(commentsActions.createComment({
      slug:this.slug(),
      commentRequest:{comment:{body}},
    }))
  }
  deleteComment(id:number):void{
    this.store.dispatch(commentsActions.deleteComment({slug:this.slug(),id}))
  }
}
