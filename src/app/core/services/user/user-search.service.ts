import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface UserSearchResults {
  uuid: string;
  name: string;
  avatarUrl: string | null;
}
// Provided at component level
@Injectable()
export class UserSearchService {
  private searchResults = new BehaviorSubject<UserSearchResults[]>([]);
  searchResults$ = this.searchResults.asObservable();

  constructor(private http: HttpClient) { }

  search(text: string) {
    return this.http.get(`${environment.apiBaseUrl}/user/search`, {
      params: {
        q: text
      }
    }).subscribe((results: UserSearchResults[]) => {
      this.searchResults.next(results)
    })
  }
}
