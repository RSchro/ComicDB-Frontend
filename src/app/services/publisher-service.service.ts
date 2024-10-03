import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PublisherService {

  private apiUrl = '/api/publisherList';

  constructor(private http: HttpClient) { }

  getAllPublishers(): Observable<{id: number, name: string}[]> {
    return this.http.get<{ id: number, name: string }[]>(this.apiUrl); 
  }
}
