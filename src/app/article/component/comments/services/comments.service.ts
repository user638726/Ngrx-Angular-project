import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CommentInterface } from '../types/comment.interface';
import { GetCommentsResponseInterface } from '../types/getCommentsResponse.interface';
import { CommentRequestInterface } from '../types/commentRequest.interface';
import { CommentResponseInterface } from '../types/commentResponse.interface';

@Injectable({
  providedIn:'root'
})
export class CommentsService {
  private http=inject(HttpClient);

  getComments(slug:string):Observable<CommentInterface[]>{
    const url = this.getUrl(slug)
    return this.http.get<GetCommentsResponseInterface>(url).pipe(map((response)=>response.comments))
  }

  createComment(slug:string,commentRequest:CommentRequestInterface):Observable<CommentInterface>{
    const url = this.getUrl(slug)
    return this.http.post<CommentResponseInterface>(url,commentRequest).pipe(map((response)=>response.comment))
  }

  deleteComment(slug:string,id:number):Observable<{}>{
    const url = `${this.getUrl(slug)}/${id}`
    return this.http.delete(url)
  }

  getUrl(slug:string):string{
    return `${environment.apiUrl}/articles/${slug}/comments`
  }
}
