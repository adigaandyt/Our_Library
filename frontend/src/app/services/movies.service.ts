import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Movie } from '../interfaces/movie';

import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  authToken: any;
  myUser: any;
  private url = 'http://localhost:8000';

  constructor(private httpClient: HttpClient) {}

  addMovie(movie: Movie) {
    this.loadToken();
    let payload: HttpHeaders = new HttpHeaders();
    payload = payload.append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    payload = payload.append('Authorization', 'Bearer ' + this.authToken);
    payload = payload.append('New_Movie', movie.toString());
    if (localStorage.getItem('isAdmin')) {
      return this.httpClient
        .post('http://localhost:8000/api/movies/new_movie', payload, {
          responseType: 'text',
        })
        .subscribe();
    } else {
      return 'Not an admin';
      console.log('not an admin');
    }
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
