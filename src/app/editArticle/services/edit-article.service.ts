import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ArticleRequestInterface } from '../../shared/types/articleRequest.interface';
import { map, Observable } from 'rxjs';
import { ArticleInterface } from '../../shared/types/article.interface';
import { environment } from '../../../environments/environment';
import { ArticleResponseInterface } from '../../shared/types/articleResponse.interface';

@Injectable({
  providedIn:'root'
})
export class EditArticleService {
  private http = inject(HttpClient);

  updateArticle(slug:string,articleRequest:ArticleRequestInterface):Observable<ArticleInterface>{
    const fullUrl =  `${environment.apiUrl}/articles/${slug}`
    return this.http.put<ArticleResponseInterface>(fullUrl,articleRequest).pipe(map((response)=>response.article))
  }
}
