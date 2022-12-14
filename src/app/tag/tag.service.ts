import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from './tag';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class TagService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiServerUrl}/tags/all`);
  }

  public addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.apiServerUrl}/tags/add`, tag);
  }

  public updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiServerUrl}/tags/update`, tag);
  }

  public deleteTag(tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tags/delete/${tagId}`);
  }
}
