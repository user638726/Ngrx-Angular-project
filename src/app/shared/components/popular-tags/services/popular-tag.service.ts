import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PopularTagType } from '../../../types/popularTag.type';
import { environment } from '../../../../../environments/environment';
import { GetPopularTagsResponseInterface } from '../types/getPopularTagsResponse.interface';

@Injectable({
  providedIn:'root'
})
export class PopularTagService {
  private http= inject(HttpClient)

  getPopularTags():Observable<PopularTagType[]>{
    const url = `${environment.apiUrl}/tags`;
    return this.http.get<GetPopularTagsResponseInterface>(url).pipe(map((response)=>response.tags))
  }
}
