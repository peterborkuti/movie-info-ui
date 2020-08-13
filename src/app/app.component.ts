import { Component, ViewChild } from '@angular/core';
import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MovieConfig } from './helpers/get-config';
import { HttpClient } from '@angular/common/http';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatTable) table: MatTable<any>;
  title = 'movie-info-ui';
  eventSource: EventSource;
  data: any[] = [{Title: 'A', Year: '10', Director: 'D'}, {Title: 'b', Year: '20', Director: 'E'}];
  columnsToDisplay = ['Title', 'Year'];

  form:  FormGroup;

  constructor(fb: FormBuilder, private config: MovieConfig, private http: HttpClient) {
    this.form = fb.group({mode: fb.control('flux'), api:fb.control('omdbapi'), title: fb.control('', Validators.required)})
  }

  onSubmit() {
    const formValue = this.form.value;
    const mode = formValue.mode === 'flux' ? 'flux' : 'synchron';
    const api = formValue.api === 'omdbapi' ? 'omdbapi' : 'themoviedb';
    const title = formValue.title;

    const url = this.config.serviceURL + mode + '/' + api;

    if (mode === 'synchron') {
      this.http.get(url, {params: {title: title}}).subscribe(o => console.log("OK", o), error => console.log("error:", error));
    }
    else {
      if (this.eventSource && (this.eventSource.OPEN || this.eventSource.CONNECTING)) {
        this.eventSource.close();
      }
      this.eventSource = new EventSource(url + "?title=" + title);
      this.data.length = 0;
      this.table.renderRows();

      this.eventSource.onmessage = (event) => {
        const data = JSON.parse(event['data']);
        if (!data.Title) {
          this.eventSource.close();
          setTimeout(() => this.table.renderRows(), 0);
        }
        else {
          if (Array.isArray(data.Director)) {
            data.Director = data.Director.join(", ");
          }
          this.data.push(data);
          console.log(this.data);
          this.table.renderRows();
        }
      }
    }
  }
}
