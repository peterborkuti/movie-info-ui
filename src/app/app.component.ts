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

  requestCancelable = false;
  formEnabled = true;

  eventSource: EventSource;

  constructor(private config: MovieConfig,
    private http: HttpClient,
    private zone: NgZone,
    private snackBar: MatSnackBar) {
  }


  onFormSubmit(formValue: MovieForm) {
    this.formEnabled = false;
    const url = this.config.serviceURL + formValue.mode + '/' + formValue.api;

    if (formValue.mode === 'synchron') {
      this.doSynchron(url, formValue.title);
    }
    else {
      this.doAsynchron(url, formValue.title);
    }
  }

  doSynchron(url: string, title: string) {
    this.http.get<{movies: []}>(url, {params: {title: title}}).subscribe(
      o => {
        this.movies = o.movies;
        // the last movie is empty
        if (this.movies.length > 0 && !this.movies.slice(-1)[0].Title) this.movies.length--;
        this.cancelRequest();
      },
      (error: HttpErrorResponse) => this.errorHandler(error.message)
    );
  }

  doAsynchron(url: string, title: string) {
    this.requestCancelable = true;

    if (this.eventSource && (this.eventSource.OPEN || this.eventSource.CONNECTING)) {
      this.eventSource.close();
    }

    this.eventSource = new EventSource(url + "?title=" + title);

    this.eventSource.onerror = ((event: ErrorEvent) => {
      this.zone.run(() => this.errorHandler("Some error happened when connecting to server."));
      this.cancelRequest();
    });

    this.movies = [];

    this.eventSource.onmessage = (event) => this.onEventMessage(event);
  }

  cancelRequest() {
    this.zone.run(() => {
      this.eventSource.close();
      this.formEnabled = true;
      this.requestCancelable = false;
    });
  }

  private onEventMessage(event: MessageEvent) {
    const data = JSON.parse(event['data']);
    if (!data.Title) {
      this.cancelRequest();
    }
    else {
      if (Array.isArray(data.Director)) {
        data.Director = data.Director.join(", ");
      }
      this.zone.run(() => this.movie = data);
    }
  }

  errorHandler(error: string) {
    this.cancelRequest();
    this.snackBar.open(error, "X", {
      duration: 0,
      panelClass: 'notif-error'
    });
  }
}
