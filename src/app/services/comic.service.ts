import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comic } from '../common/comic';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Publisher } from '../common/publisher';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private baseUrl = 'http://localhost:8080/api/comics';
  private publisherUrl = 'http://localhost:8080/api/publisher';

  constructor( private httpClient: HttpClient) { }

  getComic(theComicId: number): Observable<Comic> {
    // build URL basd on comic id
    const comicUrl = `${this.baseUrl}/${theComicId}`;

    return this.httpClient.get<Comic>(comicUrl);
  }

  getComicListPaginate(thePage: number, thePageSize: number, thePublisherId: number): Observable<GetResponseComics> {
    
    const searchUrl = `${this.baseUrl}/search/findByPublisherId?id=${thePublisherId}`
                        + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseComics>(searchUrl);
  }

  getComicList(thePublisherId: number): Observable<Comic[]> {
    const searchUrl = `${this.baseUrl}/search/findByPublisherId?id=${thePublisherId}`;

    return this.getComics(searchUrl);
  }

  searchComicsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseComics> {
    
    const searchUrl = `${this.baseUrl}/search/findByTitleContaining` 
                      + `?title=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    
    return this.httpClient.get<GetResponseComics>(searchUrl);
  }

  searchComics(theKeyword: string): Observable<Comic[]> {
      // build URL based on keyword title
      const searchUrl = `${this.baseUrl}/search/findByTitleContaining?title=${theKeyword}`;

      return this.getComics(searchUrl);
  }

  private getComics(searchUrl: string): Observable<Comic[]> {
    return this.httpClient.get<GetResponseComics>(searchUrl).pipe(
      map(response => response._embedded.comics)
    );
  }

  getComicPublishers():Observable<Publisher[]> {
    return this.httpClient.get<GetResponsePublisher>(this.publisherUrl).pipe(
      map(response => response._embedded.publisher));
  }

  submitComic(comicData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' })
      
      return this.httpClient.post<any>(this.baseUrl, comicData, { headers });
  }

}


interface GetResponseComics {
  _embedded: {
    comics: Comic[];
  },

  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

  interface GetResponsePublisher {
    _embedded: {
      publisher: Publisher[];
    }
  }