import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Movie } from '../interfaces/movie';

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
    if (localStorage.getItem('isAdmin')) {
      return this.httpClient.post(`${this.url}/api/movies/new_movie`, movie, {
        responseType: 'text',
      });
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
