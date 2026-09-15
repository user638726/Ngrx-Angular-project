import { Component, input, inject, OnInit, signal, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { feedActions } from './store/actions';
import { selectError, selectFeedData, selectIsLoading } from './store/reducers';
import { combineLatest } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ErrorMessage } from '../error-message/error-message';
import { Loading } from '../loading/loading';
import { environment } from '../../../../environments/environment';
import { Pagination } from '../pagination/pagination';
import queryString from 'query-string'
import { TagList } from '../tag-list/tag-list';

@Component({
  imports: [AsyncPipe, RouterLink, ErrorMessage, Loading,Pagination,TagList],
  selector: 'app-feed',
  styleUrl: './feed.css',
  templateUrl: './feed.html',
})
export class Feed implements OnInit,OnChanges{
apiUrl = input<string>('');
private store=inject(Store)
private router = inject(Router);
private route = inject(ActivatedRoute)
limit = environment.limit
baseUrl = this.router.url.split('?')[0]
currentPage = signal<number>(1);



data$ = combineLatest({
  isLoading:this.store.select(selectIsLoading),
  error:this.store.select(selectError),
  feed:this.store.select(selectFeedData),
})
ngOnInit(): void {

  this.route.queryParams.subscribe((params:Params)=>{
    console.log('params',params)
    this.currentPage.set(Number(params['page']||'1'))
    this.fetchFeed()
  })
}
ngOnChanges(changes: SimpleChanges): void {
  const isApiUrlChanged =
  !changes['apiUrl'].firstChange && changes['apiUrl'].currentValue!== changes['apiUrl'].previousValue
  if(isApiUrlChanged){
    this.fetchFeed()
  }
}
fetchFeed():void{
  const offset = this.currentPage() * this.limit - this.limit
  const parsedUrl = queryString.parseUrl(this.apiUrl())
  const stringifiedParams = queryString.stringify({
    limit:this.limit,
    offset,
    ...parsedUrl.query,
  })
  const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
  console.log('offset',offset)
this.store.dispatch(feedActions.getFeed({url:apiUrlWithParams}))
}

}
