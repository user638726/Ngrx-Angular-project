import { Component, inject, input, model } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AddToFavoritesService } from './service/add-to-favorites.service';
import { Store } from '@ngrx/store';
import { addToFavoritesActions } from './store/actions';
import { selectCurrentUser } from '../../../auth/store/reducers';

@Component({
  imports: [NgClass],
  selector: 'app-add-to-favorites',
  styleUrl: './add-to-favorites.css',
  templateUrl: './add-to-favorites.html',
})
export class AddToFavorites {
  private store=inject(Store);
  private router=inject(Router);
  private currentUser=toSignal(this.store.select(selectCurrentUser));
  isFavorited = model<boolean>(false);
  favoritesCount = model<number>(0);

  articleSlug = input<string>('');

  handleLike(): void {
    if (!this.currentUser()) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.store.dispatch(addToFavoritesActions.addToFavorites({
      isFavorited:this.isFavorited(),
      slug:this.articleSlug()
    }))
    if (this.isFavorited()) {
      this.favoritesCount.update(count => count - 1);
    } else {
      this.favoritesCount.update(count => count + 1);
    }

    this.isFavorited.update(value => !value);
  }
}
