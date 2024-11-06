import { Injectable } from '@angular/core';
import { WebFormRepository } from './web-from.repository';
import { catchError, Observable, of, throwError } from 'rxjs';
import { JsonForm } from '../../core/models/json-form';
import { WebFormModel } from './models/web-form.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'any',
})
export class WebFormService {
  constructor(private repository: WebFormRepository) {}
  loadForm(webFormId: number): Observable<JsonForm> {
    return this.repository.loadForm(webFormId).pipe(
      catchError((reason) => {
        console.error(reason);
        return throwError(() => reason);
      }),
    );
  }
  createForm(webForm: Partial<WebFormModel>): Observable<{ id: number }> {
    return this.repository.createForm(webForm).pipe(
      catchError((reason) => {
        console.error(reason);
        return throwError(() => reason);
      }),
    );
  }
  mapFilterToRequest(form: Partial<WebFormModel>): Partial<WebFormModel> {
    const result = {
      name: form.name,
      age: form.age,
      maritalStatus: form.maritalStatus,
      skils: form.skils.filter((s) => s),
      university: form.university.filter((s) => s),
    };
    return result;
  }
  getFakeForm(): Observable<any> {
    const result: null = null;
    return of(result);
  }
}
