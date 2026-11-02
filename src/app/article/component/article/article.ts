import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { articleActions } from '../../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import { selectArticleData, selectError, selectIsLoading } from '../../store/reducers';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Loading } from '../../../shared/components/loading/loading';
import { ErrorMessage } from '../../../shared/components/error-message/error-message';
import { TagList } from '../../../shared/components/tag-list/tag-list';
import { FollowUser } from '../../../shared/components/follow-user/follow-user';
import { AddToFavorites } from '../../../shared/components/add-to-favorites/add-to-favorites';
import { Comments } from '../comments/comments';

@Component({
  imports: [AsyncPipe, NgTemplateOutlet, RouterLink, Loading, ErrorMessage, TagList, FollowUser, AddToFavorites, Comments],
  selector: 'app-article',
  styleUrl: './article.css',
  templateUrl: './article.html',
})
export class Article implements OnInit {
  private store = inject(Store)
  private route = inject(ActivatedRoute)
  slug = this.route.snapshot.paramMap.get('slug') ?? ''
  isAuthor$=combineLatest({
    article:this.store.select(selectArticleData),
    currentUser:this.store.select(selectCurrentUser).pipe(filter((currentUser):currentUser is CurrentUserInterface | null=>currentUser!==undefined)),
  }).pipe(map(({article,currentUser})=>{
    if(!article || !currentUser){
      return false
    }
    return article.author.username === currentUser.username
  }))
  data$=combineLatest({
    isLoading:this.store.select(selectIsLoading),
    error:this.store.select(selectError),
    article:this.store.select(selectArticleData),
    isAuthor:this.isAuthor$
  })
  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({slug:this.slug}))
  }
  deleteArticle():void{
    this.store.dispatch(articleActions.deleteArticle({slug:this.slug}))
  }

}
