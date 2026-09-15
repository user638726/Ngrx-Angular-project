import { Component, input } from '@angular/core';
import { PopularTagType } from '../../types/popularTag.type';

@Component({
  imports: [],
  selector: 'app-tag-list',
  styleUrl: './tag-list.css',
  templateUrl: './tag-list.html',
})
export class TagList {
  tags = input<PopularTagType[]>([]);
}
