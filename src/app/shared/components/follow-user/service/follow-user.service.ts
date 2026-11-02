import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProfileInterface } from '../../../types/profile.interface';
import { environment } from '../../../../../environments/environment';
import { ProfileResponseInterface } from '../../../types/profileResponse.interface';

@Injectable({
  providedIn:'root'
})
export class FollowUserService {
  private http=inject(HttpClient);

  followUser(username:string):Observable<ProfileInterface>{
    const url = this.getUrl(username)
    return this.http.post<ProfileResponseInterface>(url,{}).pipe(map(this.getProfile))
  }

  unfollowUser(username:string):Observable<ProfileInterface>{
    const url = this.getUrl(username)
    return this.http.delete<ProfileResponseInterface>(url).pipe(map(this.getProfile))
  }

  getUrl(username:string):string{
    return `${environment.apiUrl}/profiles/${username}/follow`
  }

  getProfile(response:ProfileResponseInterface):ProfileInterface{
    return response.profile
  }
}
