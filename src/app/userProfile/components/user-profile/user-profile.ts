import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { userProfileActions } from '../../store/actions';
import { combineLatest, filter, map } from 'rxjs';
import { selectError, selectIsLoading, selectUserProfileData } from '../../store/reducers';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { UserProfileInterface } from '../../types/userProfile.interface';
import { AsyncPipe } from '@angular/common';
import { Feed } from '../../../shared/components/feed/feed';
import { FollowUser } from '../../../shared/components/follow-user/follow-user';

@Component({
  imports: [AsyncPipe, RouterLink, RouterLinkActive, Feed, FollowUser],
  selector: 'app-user-profile',
  styleUrl: './user-profile.css',
  templateUrl: './user-profile.html',
})
export class UserProfile implements OnInit {
  slug = signal<string>('');

  private route = inject(ActivatedRoute)
  private store = inject(Store)
  private router = inject(Router)

  isCurrentUserProfile$ = combineLatest({
    currentUser:this.store.pipe(
      select(selectCurrentUser),
      filter((currentUser):currentUser is CurrentUserInterface | null => currentUser !== undefined)
    ),
    userProfile:this.store.pipe(
       select(selectUserProfileData),
       filter((userProfile):userProfile is UserProfileInterface => Boolean(userProfile))
    ),
  }).pipe(map(({currentUser, userProfile})=>{
    return currentUser?.username === userProfile.username
  }))

   data$ = combineLatest({
    isLoading:this.store.select(selectIsLoading),
    error:this.store.select(selectError),
    userProfile:this.store.select(selectUserProfileData),
    isCurrentUserProfile:this.isCurrentUserProfile$
  })
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.slug.set(params['slug'])
      this.fetchUserProfile()
    })
  }
  fetchUserProfile():void{
    this.store.dispatch(userProfileActions.getUserProfile({slug:this.slug()}))
  }

  isFavoritesPage():boolean{
    return this.router.url.includes('favorites')
  }

  getApiUrl():string{
    return this.isFavoritesPage() ? `/articles?favorited=${this.slug()}` : `/articles?author=${this.slug()}`
  }
}
