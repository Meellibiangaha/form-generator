import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class WebFormRepository {
  constructor(private http: HttpClient) {}
  loadForm(): Observable<any> {
    return of(null);
  }
}
