import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userAdmin: string;

  constructor(private routerLink: Router) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('isAdmin'));
    this.userAdmin = 'true';
  message = "I'm passing data";
}
