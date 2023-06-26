import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent {
  title: string;
  desc: string;
  movie_id: string = '';
  movielist: any;
  id: any;
  id2: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}
  ngOnInit(): void {
    this.movie_id = this.activatedRoute.snapshot.paramMap.get('id') || 'none';

    this.moviesService.currentMovieList.subscribe(
      (response) => (this.movielist = response)
    );
    let currMovie = this.movielist.find((i: any) => i._id === this.movie_id);
    this.id = currMovie._id;

    console.log(currMovie);
    this.title = currMovie.title;
    this.desc = currMovie.desc;
  }
}
