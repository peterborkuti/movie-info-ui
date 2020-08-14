import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MovieConfig, getConfig} from './helpers/get-config';

import { DataTablesModule } from 'angular-datatables';
import { MovieTableComponent } from './movie-table/movie-table.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieTableComponent,
    MovieFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    DataTablesModule,
    MatButtonModule
  ],
  providers: [
    {provide: MovieConfig, useFactory: getConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
