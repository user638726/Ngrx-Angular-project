import { Component, inject, OnInit, signal } from '@angular/core';
import { Feed } from '../../../shared/components/feed/feed';
import { Banner } from '../../../shared/components/banner/banner';
import { PopularTags } from '../../../shared/components/popular-tags/popular-tags';
import { FeedToggler } from '../../../shared/components/feed-toggler/feed-toggler';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  imports: [Feed, Banner, PopularTags, FeedToggler],
  selector: 'app-tag-feed',
  styleUrl: './tag-feed.css',
  templateUrl: './tag-feed.html',
})
export class TagFeed implements OnInit{
  apiUrl = signal<string>('');
  tagName = signal<string>('');
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.tagName.set(params['slug'])
      this.apiUrl.set(`/articles?tag=${this.tagName()}`)
    })
  }
}
