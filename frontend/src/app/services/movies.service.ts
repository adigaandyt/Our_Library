import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subject,
  tap,
  interval,
  firstValueFrom,
  BehaviorSubject,
} from 'rxjs';
import { Movie } from '../interfaces/movie';
import axios from 'axios';

import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  //Share movie list between components
  private movieList = new BehaviorSubject<object>({});
  currentMovieList = this.movieList.asObservable();

  authToken: any;
  myUser: any;
  private url = 'http://ourlib.ddns.net:80/api/movies';

  constructor(private httpClient: HttpClient) {}

  addMovie(movie: Movie) {
    let urlPath = '/new_movie';
    this.loadToken();
    movie.auth = 'Bearer ' + this.authToken;
    let payload = <JSON>movie;

    if (localStorage.getItem('isAdmin')) {
      return this.httpClient
        .post(this.url + urlPath, payload, {
          responseType: 'text',
        })
        .subscribe();
    } else {
      return 'Not an admin';
    }
  }

  async getMovies() {
    let returnData;
    let urlPath = '/';

    await axios
      .get("http://localhost:80/api/movies" + urlPath)
      .then((respone) => {
        returnData = respone.data;
        this.movieList.next(returnData); //update global movie list
      })
      .catch((error) => {
        console.log(error);
      });

    return returnData;
    /*
    const response = await this.httpClient
      .get(this.url + urlPath, {
        responseType: 'json',
      })
      .subscribe((data: any) => {
        returnData = data;
        console.log(data);
      });
    console.log(returnData);
    return returnData;
      */
  }

  addReview(review: string, movieId: string) {
    console.log(review);
    console.log(movieId);

    let urlPath = '/new_review';
    this.loadToken();
    let auth = 'Bearer ' + this.authToken;
    let payload = {
      review: review,
      movie_id: movieId,
      auth: auth,
      user: localStorage.getItem('name'),
    };

    if (localStorage.getItem('id_token')) {
      return this.httpClient
        .post(this.url + urlPath, payload, {
          responseType: 'text',
        })
        .subscribe();
    } else {
      console.log('not a user');
      return 'Not a user';
    }
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
