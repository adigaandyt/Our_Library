import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  movie = {
    title: 'Movie title',
    desc: 'some long descrption',
    _id: 'beeg long id !@#!@#',
    imageUrl:
      'https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg',
  };
}
