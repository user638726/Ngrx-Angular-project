import { Component } from '@angular/core';
import { Feed } from '../../../shared/components/feed/feed';
import { Banner } from '../../../shared/components/banner/banner';
import { PopularTags } from '../../../shared/components/popular-tags/popular-tags';
import { FeedToggler } from '../../../shared/components/feed-toggler/feed-toggler';

@Component({
  imports: [Feed, Banner, PopularTags, FeedToggler],
  selector: 'app-global-feed',
  styleUrl: './global-feed.css',
  templateUrl: './global-feed.html',
})
export class GlobalFeed {
  apiUrl = '/articles'
}
