import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormComponent } from './movie-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';

describe('MovieFormComponent', () => {
  let component: MovieFormComponent;
  let fixture: ComponentFixture<MovieFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieFormComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule,
        MatRadioModule,
        MatFormFieldModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable submit button', () => {
    const submit: HTMLButtonElement = fixture.nativeElement.querySelector('mat-toolbar button');

    expect(submit.hasAttribute('disabled')).toBeTrue();
  });

  it('should enable submit button when input not empty', (done) => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const submit: HTMLButtonElement = fixture.nativeElement.querySelector('mat-toolbar button');

    fixture.whenStable().then(() => {
      expect(submit.disabled).toBeTrue();

      component.form.controls.title.setValue("ANYTEXT");
      input.dispatchEvent(new Event('input'));
      component.form.updateValueAndValidity();
      fixture.detectChanges();

      expect(submit.disabled).toBeFalse();

      done();
    });
  });

  it('should return with settings on submit', (done) => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const submit: HTMLButtonElement = fixture.nativeElement.querySelector('mat-toolbar button');

    fixture.whenStable().then(() => {
      component.form.controls.title.setValue("ANYTEXT");
      component.form.controls.mode.setValue('synchron');
      component.form.controls.api.setValue('themoviedb');

      input.dispatchEvent(new Event('input'));
      component.form.updateValueAndValidity();
      fixture.detectChanges();

      expect(submit.disabled).toBeFalse();
      
      component.value.subscribe((data) => {
        expect(data).toEqual({title: 'ANYTEXT', api: 'themoviedb', mode: 'synchron'});
        done();
      });

      submit.click();
      fixture.detectChanges();
    });
  });
});
