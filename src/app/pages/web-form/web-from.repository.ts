import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JsonFormDataConfig } from '../../core/config/json-form-data';
import { JsonForm } from '../../core/models/json-form';

@Injectable({
  providedIn: 'any',
})
export class WebFormRepository {
  constructor(private http: HttpClient) {}
  loadForm(): Observable<JsonForm> {
    return of(JsonFormDataConfig.jsonFormOne);
  }
}
