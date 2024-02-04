import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
})
export class NewMovieComponent {
  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private hhtp: HttpClient
  ) {}

  regForm = new FormGroup({
    img: new FormControl(''),
    desc: new FormControl(''),
    title: new FormControl(''),
  });

  url = 'http://ourlib.ddns.net:80/api/movies/new_movie'; // Replace with your backend URL

  payload: any = {};

  newMovieSubmit() {
    const newMovie: Movie = {
      img: this.regForm.value.img?.toString(),
      title: this.regForm.value.title?.toString(),
      desc: this.regForm.value.desc?.toString(),
    };
    this.moviesService.addMovie(newMovie);
  }
}
