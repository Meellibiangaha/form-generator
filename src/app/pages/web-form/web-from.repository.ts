import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JsonFormDataConfig } from '../../core/config/json-form-data';
import { JsonForm } from '../../core/models/json-form';
import { WebFormModel } from './models/web-form.model';
import { AppStorageService } from '../../core/services/app-storage.service';

@Injectable({
  providedIn: 'any',
})
export class WebFormRepository {
  constructor(
    private http: HttpClient,
    private localStorageService: AppStorageService,
  ) {}

  loadForm(webFormId: number): Observable<JsonForm> {
    return of(JsonFormDataConfig.getJsonForm(webFormId));
  }
  createForm(webForm: Partial<WebFormModel>): Observable<{ id: number }> {
    /** Посмотреть что передаю */
    console.log(webForm);
    const webFormKey = 'WebForm';
    this.localStorageService.saveItem(webFormKey, webForm);
    return of({ id: 2 });
  }
}
