import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent implements OnInit {
  @Input() cardData: any;
  title: string = 'title';
  desc: string = 'desc';
  img: string = '';
  id: string;
  review_data: any;

  constructor(private routerLink: Router) {}

  ngOnInit(): void {
    //console.log(this.cardData);
    this.img = this.cardData.img;
    this.title = this.cardData.title;
    this.desc = this.cardData.desc;
    this.id = this.cardData._id;
    this.review_data = this.cardData.review;
  }

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
