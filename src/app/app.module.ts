import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MovieConfig, getConfig} from './helpers/get-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [
    {provide: MovieConfig, useFactory: getConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
