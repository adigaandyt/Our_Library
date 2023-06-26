import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Movie } from '../../interfaces/movie';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.css'],
})
export class NewReviewComponent {
  movieId: string;
  review: string;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    private hhtp: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieId =
      this.activatedRoute.snapshot.paramMap.get('id') || 'movie id';
  }

  regForm = new FormGroup({
    review: new FormControl(''),
  });

  newReviewSubmit() {
    this.review = this.regForm.value.review?.toString() || 'review';
    this.moviesService.addReview(this.review, this.movieId);
  }
}
