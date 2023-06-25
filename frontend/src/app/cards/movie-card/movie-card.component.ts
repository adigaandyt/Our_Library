import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() img: string;
  @Input() title: string;
  @Input() desc: string;

  constructor() {}

  ngOnInit(): void {}

  movie = {
    title: 'woods',
    desc: 'some long descrption',
    _id: 'beeg long id !@#!@#',
    imageUrl:
      'https://marketplace.canva.com/EAFH3gODxw4/1/0/1131w/canva-black-%26-white-modern-mystery-forest-movie-poster-rLty9dwhGG4.jpg',
  };
}
