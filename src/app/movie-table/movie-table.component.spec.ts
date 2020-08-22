import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MovieTableComponent } from './movie-table.component';
import { DataTablesModule } from 'angular-datatables';
import { Movie } from '../helpers/movie';
import { By } from '@angular/platform-browser';

describe('MovieTableComponent', () => {
  let component: MovieTableComponent;
  let fixture: ComponentFixture<MovieTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieTableComponent ],
      imports: [DataTablesModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add movie', (done) => {
    component.movie = <Movie>{Title: 'TITLE', Year: '2020', Director: 'DIRECTOR'};
    fixture.detectChanges();

    component.dtElement.dtInstance.then(() => {
      const table: HTMLElement = fixture.nativeElement.querySelector('table');
      expect(table.textContent).toContain('TITLE');
      expect(table.textContent).toContain('2020');
      expect(table.textContent).toContain('DIRECTOR');
      done();
    })
  });

  it('should add movies', (done) => {
    component.movies = <Movie[]>[
      {Title: 'TITLE1', Year: '2021', Director: 'DIRECTOR1'},
      {Title: 'TITLE2', Year: '2022', Director: 'DIRECTOR2'}];

      fixture.detectChanges();

    component.dtElement.dtInstance.then(() => {
      const table: HTMLElement = fixture.nativeElement.querySelector('table');
      expect(table.textContent).toContain('TITLE1');
      expect(table.textContent).toContain('2021');
      expect(table.textContent).toContain('DIRECTOR1');
      expect(table.textContent).toContain('TITLE2');
      expect(table.textContent).toContain('2022');
      expect(table.textContent).toContain('DIRECTOR2');
      done();
    })
  });

});
