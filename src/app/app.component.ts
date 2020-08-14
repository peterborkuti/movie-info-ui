import { Component, NgZone } from '@angular/core';
import { MovieConfig } from './helpers/get-config';
import { HttpClient } from '@angular/common/http';

import { MovieForm } from './helpers/movie-form';
import { Movie } from './helpers/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: Movie[]= [];
  movie: Movie = new Movie();

  eventSource: EventSource;

  constructor(private config: MovieConfig, private http: HttpClient, private zone: NgZone) {
  }


  onFormSubmit(formValue: MovieForm) {
    const url = this.config.serviceURL + formValue.mode + '/' + formValue.api;

    if (formValue.mode === 'synchron') {
      this.http.get<{movies: []}>(url, {params: {title: formValue.title}}).subscribe(o => {
        this.movies = o.movies;
      }, error => console.log("error:", error));
    }
    else {
      if (this.eventSource && (this.eventSource.OPEN || this.eventSource.CONNECTING)) {
        this.eventSource.close();
      }
      this.eventSource = new EventSource(url + "?title=" + formValue.title);
      this.movies = [];

      this.eventSource.onmessage = (event) => {
        const data = JSON.parse(event['data']);
        if (!data.Title) {
          this.eventSource.close();
        }
        else {
          if (Array.isArray(data.Director)) {
            data.Director = data.Director.join(", ");
          }
          this.zone.run(() => this.movie = data);
        }
      }
    }
  }
}
