import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  selector: 'app-feed-toggler',
  styleUrl: './feed-toggler.css',
  templateUrl: './feed-toggler.html',
})
export class FeedToggler {
tagName = input<string | undefined>();
private store=inject(Store);
currentUser$ = this.store.select(selectCurrentUser)
}
