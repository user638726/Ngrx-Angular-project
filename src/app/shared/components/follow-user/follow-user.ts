import { Component, inject, input, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { followUserActions } from './store/actions';
import { selectCurrentUser } from '../../../auth/store/reducers';

@Component({
  imports: [NgClass],
  selector: 'app-follow-user',
  styleUrl: './follow-user.css',
  templateUrl: './follow-user.html',
})
export class FollowUser {
  private store=inject(Store);
  private router=inject(Router);
  private currentUser=toSignal(this.store.select(selectCurrentUser));
  isFollowing = model<boolean>(false);

  username = input<string>('');

  handleFollow(): void {
    if (!this.currentUser()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.store.dispatch(followUserActions.followUser({
      isFollowing:this.isFollowing(),
      username:this.username()
    }))

    this.isFollowing.update(value => !value);
  }
}
