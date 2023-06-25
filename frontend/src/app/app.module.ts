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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
