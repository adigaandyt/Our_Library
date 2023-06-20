import { Component } from '@angular/core';

@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css'],
})
export class NewMovieComponent {
  onFileSelected(event: Event) {
    console.log(event);
  }

  onUploadClick() {}
}
