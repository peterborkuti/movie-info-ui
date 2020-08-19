import { Component, NgZone } from '@angular/core';
import { MovieConfig } from './helpers/get-config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MovieForm } from './helpers/movie-form';
import { Movie } from './helpers/movie';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  movies: Movie[]= [];
  movie: Movie = new Movie();

  eventSource: EventSource;

  constructor(private config: MovieConfig,
    private http: HttpClient,
    private zone: NgZone,
    private snackBar: MatSnackBar) {
  }


  onFormSubmit(formValue: MovieForm) {
    const url = this.config.serviceURL + formValue.mode + '/' + formValue.api;

    if (formValue.mode === 'synchron') {
      this.doSynchron(url, formValue.title);
    }
    else {
      this.doAsynchron(url, formValue.title);
    }
  }

  private doSynchron(url: string, title: string) {
    this.http.get<{movies: []}>(url, {params: {title: title}}).subscribe(
      o => this.movies = o.movies,
      (error: HttpErrorResponse) => this.errorHandler(error.message)
    );
  }

  private doAsynchron(url: string, title: string) {
    if (this.eventSource && (this.eventSource.OPEN || this.eventSource.CONNECTING)) {
      this.eventSource.close();
    }

    this.eventSource = new EventSource(url + "?title=" + title);

    this.eventSource.onerror = ((event: ErrorEvent) => {
      this.zone.run(() => this.errorHandler("Some error happened when connecting to server."));
      this.eventSource.close();
    });

    this.movies = [];

    this.eventSource.onmessage = this.onEventMessage;
  }

  private onEventMessage(event: MessageEvent) {
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

  errorHandler(error: string) {
    this.snackBar.open(error, "X", {
      duration: 0,
      panelClass: 'notif-error'
    });
  }
}
