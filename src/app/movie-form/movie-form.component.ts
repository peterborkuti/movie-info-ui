import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieConfig } from '../helpers/get-config';
import { HttpClient } from '@angular/common/http';
import { MovieForm } from '../helpers/movie-form';

@Component({
  selector: 'movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  @Output() value = new EventEmitter<MovieForm>();

  form:  FormGroup;

  constructor(fb: FormBuilder, private config: MovieConfig, private http: HttpClient) {
    this.form = fb.group({mode: fb.control('flux'), api:fb.control('omdbapi'), title: fb.control('', Validators.required)})
  }


  ngOnInit(): void {
  }

  onSubmit() {
    const formValue: MovieForm = <MovieForm>this.form.value;

    this.value.next(formValue);
  }

}
