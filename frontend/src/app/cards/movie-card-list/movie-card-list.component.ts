import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-card-list',
  templateUrl: './movie-card-list.component.html',
  styleUrls: ['./movie-card-list.component.css'],
})
export class MovieCardListComponent {
  promise: any;
  data: any;
  constructor(private movieServices: MoviesService) {}
  ngOnInit() {
    this.promise = this.movieServices.getMovies();

    this.promise.then((data: any) => {
      this.data = data;
    });
  }
}
