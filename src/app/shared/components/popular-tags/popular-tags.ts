import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { popularTagsActions } from './store/actions';
import { combineLatest } from 'rxjs';
import { selectError, selectIsLoading, selectPopularTagsData } from './store/reducers';
import { AsyncPipe } from '@angular/common';
import { Loading } from '../loading/loading';
import { ErrorMessage } from '../error-message/error-message';
import { RouterLink } from '@angular/router';

@Component({
  imports: [AsyncPipe, Loading, ErrorMessage, RouterLink],
  selector: 'app-popular-tags',
  styleUrl: './popular-tags.css',
  templateUrl: './popular-tags.html',
})
export class PopularTags implements OnInit{
  private store = inject(Store);

  data$=combineLatest({
    popularTags:this.store.select(selectPopularTagsData),
    isLoading:this.store.select(selectIsLoading),
    error:this.store.select(selectError),
  })
  ngOnInit(): void {
    this.store.dispatch(popularTagsActions.getPopularTags())
  }

}
