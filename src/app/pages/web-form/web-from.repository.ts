import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JsonFormDataConfig } from '../../core/config/json-form-data';
import { JsonForm } from '../../core/models/json-form';
import { WebFormModel } from './models/web-form.model';

@Injectable({
  providedIn: 'any',
})
export class WebFormRepository {
  constructor(private http: HttpClient) {}

  loadForm(webFormId: number): Observable<JsonForm> {
    return webFormId === 1
      ? of(JsonFormDataConfig.jsonFormTwo)
      : webFormId === 2
        ? of(JsonFormDataConfig.jsonFormTwo)
        : of(JsonFormDataConfig.jsonFormOne);
  }
  createForm(webForm: Partial<WebFormModel>): Observable<{ id: number }> {
    /** Посмотреть что передаю */
    console.log(webForm);
    return of({ id: 1 });
  }
}
