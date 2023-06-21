import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NewMovieComponent } from './pages/new-movie/new-movie.component';
import { NewReviewComponent } from './pages/new-review/new-review.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { MovieCardComponent } from './cards/movie-card/movie-card.component';
import { ReviewCardComponent } from './cards/review-card/review-card.component';
import { MovieCardListComponent } from './cards/movie-card-list/movie-card-list.component';
import { ReviewCardListComponent } from './cards/review-card-list/review-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NewMovieComponent,
    NewReviewComponent,
    ReviewsComponent,
    MovieCardComponent,
    ReviewCardComponent,
    MovieCardListComponent,
    ReviewCardListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
