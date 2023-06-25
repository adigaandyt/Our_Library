import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MoviesService } from '../../services/movies.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
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

  url = 'http://localhost:8000/api/users/register'; // Replace with your backend URL
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  payload: any = {};

  newMovieSubmit() {
    console.log(this.regForm.value.img);
    console.log(this.regForm.value.title);
    console.log(this.regForm.value.desc);
  }
}
