import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  imports: [NgClass,RouterLink],
  selector: 'app-pagination',
  styleUrl: './pagination.css',
  templateUrl: './pagination.html',
})
export class Pagination {
  private utilsService=inject(UtilsService);
total = input<number>(0);
limit = input<number>(10);
currentPage = input<number>(1);
url = input<string>('');

  pagesCount = computed(() =>
    Math.ceil(this.total() / this.limit())
  );
  pages = computed(() => {
    const count = this.pagesCount();

    return count > 0
      ? this.utilsService.range(1, count+1)
      : [];
  });
  constructor() {
    effect(() => {
      console.log('pagesCount', this.pagesCount());
      console.log(this.pages());
    });
  }

}
