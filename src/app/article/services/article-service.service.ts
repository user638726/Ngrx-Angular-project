import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn:'root'
})
export class ArticleService {
  private http=inject(HttpClient);

  deleteArticle(slug:string):Observable<{}>{
    const fullUrl =  `${environment.apiUrl}/articles/${slug}`;
    return this.http.delete(fullUrl)
  }

}
