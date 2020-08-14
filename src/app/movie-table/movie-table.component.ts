import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { Movie } from '../helpers/movie';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.css']
})
export class MovieTableComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  @Input()
  public set movie(m : Movie) {
    if (!this.dtElement) return;

    this.dtElement.dtInstance.then((api: DataTables.Api) => {
      api.row.add(m).draw();
    });
  }

  @Input()
  public set movies(m : Movie[]) {
    if (!this.dtElement) return;

    this.dtElement.dtInstance.then((api: DataTables.Api) => {
      api.clear().rows.add(m).draw();
    });
  }
  
  constructor() { }

  ngOnInit(): void {
    this.dtOptions = {
      data: [],
      columns: [
        {data: 'Title'},
        {data: 'Year'},
        {data: 'Director'},
      ]
    };
  }

}
