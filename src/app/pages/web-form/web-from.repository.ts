import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JsonFormDataConfig } from '../../core/config/json-form-data';

@Injectable({
  providedIn: 'any',
})
export class WebFormRepository {
  constructor(private http: HttpClient) {}
  loadForm(): Observable<any> {
    return of(JsonFormDataConfig.jsonFormOne);
  }
}
